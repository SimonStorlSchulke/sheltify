package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"gopkg.in/gographics/imagick.v3/imagick"
)

// Image size presets
var sizes = map[string]uint{
	"thumbnail": 150,
	"small":     320,
	"medium":    640,
	"large":     1280,
	"xlarge":    1920,
}

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("Usage: %s <input_image>", os.Args[0])
	}

	inputPath := os.Args[1]
	if _, err := os.Stat(inputPath); os.IsNotExist(err) {
		log.Fatalf("Error: File %s not found", inputPath)
	}

	// Initialize ImageMagick
	imagick.Initialize()
	defer imagick.Terminate()

	// Process the image
	err := generateResizedImages(inputPath)
	if err != nil {
		log.Fatalf("Failed to generate images: %v", err)
	}
	fmt.Println("Image processing completed successfully.")
}

func generateResizedImages(inputPath string) error {
	mw := imagick.NewMagickWand()
	defer mw.Destroy()

	// Read the input image
	err := mw.ReadImage(inputPath)
	if err != nil {
		return fmt.Errorf("failed to read image: %w", err)
	}

	// Get input image base name
	baseName := filepath.Base(inputPath)
	ext := filepath.Ext(baseName)
	name := baseName[0 : len(baseName)-len(ext)]
	outputDir := "output"

	// Create output directory if it doesn't exist
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}

	// Get original aspect ratio
	origWidth := mw.GetImageWidth()
	origHeight := mw.GetImageHeight()
	aspectRatio := float64(origHeight) / float64(origWidth)

	// Resize and save images
	for label, width := range sizes {
		height := uint(float64(width) * aspectRatio)

		// Clone image wand for resizing
		resized := mw.Clone()
		err := resized.ResizeImage(width, height, imagick.FILTER_LANCZOS)
		if err != nil {
			resized.Destroy()
			return fmt.Errorf("failed to resize image to %s: %w", label, err)
		}

		// Set format to WebP
		resized.SetImageFormat("webp")

		// Save output file
		outputPath := filepath.Join(outputDir, fmt.Sprintf("%s_%s.webp", name, label))
		err = resized.WriteImage(outputPath)
		resized.Destroy()

		if err != nil {
			return fmt.Errorf("failed to save %s image: %w", label, err)
		}
		fmt.Printf("Saved: %s\n", outputPath)
	}

	return nil
}
