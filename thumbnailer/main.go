package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sync"

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

	// Create output directory if not exists
	outputDir := "output"
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		log.Fatalf("Failed to create output directory: %v", err)
	}

	// Get base name of input file
	baseName := filepath.Base(inputPath)
	ext := filepath.Ext(baseName)
	name := baseName[0 : len(baseName)-len(ext)]

	mw := imagick.NewMagickWand()
	err := mw.ReadImage(inputPath)
	if err != nil {
		log.Fatalf("Failed to read input image: %v", err)
	}
	origWidth := mw.GetImageWidth()
	origHeight := mw.GetImageHeight()
	aspectRatio := float64(origHeight) / float64(origWidth)
	mw.Destroy()

	// Use a WaitGroup to wait for all Goroutines to finish
	var wg sync.WaitGroup
	for label, width := range sizes {
		if origWidth < width {
			continue
		}
		wg.Add(1)
		go func(label string, width uint) {
			defer wg.Done()
			if err := processImage(inputPath, outputDir, name, label, width, aspectRatio); err != nil {
				log.Printf("Error processing %s: %v\n", label, err)
			}
		}(label, width)
	}

	// Wait for all Goroutines to finish
	wg.Wait()
	fmt.Println("Image processing completed successfully.")
}

func processImage(inputPath, outputDir, name, label string, width uint, aspectRatio float64) error {
	mw := imagick.NewMagickWand()
	defer mw.Destroy()

	// Read the input image
	err := mw.ReadImage(inputPath)
	if err != nil {
		return fmt.Errorf("failed to read image: %w", err)
	}

	height := uint(float64(width) * aspectRatio)

	err = mw.ResizeImage(width, height, imagick.FILTER_LANCZOS)
	if err != nil {
		return fmt.Errorf("failed to resize image to %s: %w", label, err)
	}

	// Set format to WebP
	mw.SetImageFormat("webp")
	mw.SetOption("webp:lossless", "false") // Ensure lossy compression
	mw.SetOption("webp:method", "6")       // Compression method (0-6, higher = better)
	mw.SetOption("webp:alpha-quality", "75")
	mw.SetImageCompressionQuality(75)

	outputPath := filepath.Join(outputDir, fmt.Sprintf("%s_%s.webp", name, label))
	err = mw.WriteImage(outputPath)
	if err != nil {
		return fmt.Errorf("failed to save %s image: %w", label, err)
	}

	fmt.Printf("Saved: %s\n", outputPath)
	return nil
}
