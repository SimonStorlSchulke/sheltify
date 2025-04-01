package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"sheltify-new-backend/repository"
	"sheltify-new-backend/shtypes"
	"strconv"

	"github.com/google/uuid"
)

func UploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("File Upload Endpoint Hit")

	// upload 25 MB max
	r.ParseMultipartForm(25 << 20)
	uploadedFile, handler, err := r.FormFile("file")
	if err != nil {
		internalServerErrorResponse(w, err.Error())
		return
	}
	defer uploadedFile.Close()

	filename := uuid.NewString() + filepath.Ext(handler.Filename)
	savePath := filepath.Join("uploads", filename)
	err = os.MkdirAll("uploads", os.ModePerm)
	tempFile, err := os.Create(savePath)

	if err != nil {
		internalServerErrorResponse(w, err.Error())
		return
	}
	defer tempFile.Close()

	fileBytes, err := io.ReadAll(uploadedFile)
	if err != nil {
		internalServerErrorResponse(w, err.Error())
		return
	}
	// write this byte array to our temporary file
	tempFile.Write(fileBytes)

	focusX, err := strconv.ParseFloat(r.FormValue("FocusX"), 32)
	focusY, err := strconv.ParseFloat(r.FormValue("FocusY"), 32)

	if err != nil {
		badRequestResponse(w, "FocusX and FocusY must be numbers")
		return
	}

	response := shtypes.MediaFile{
		FileName:    filename,
		Name:        r.FormValue("Name"),
		Description: r.FormValue("Description"),
		FocusX:      float32(focusX),
		FocusY:      float32(focusY),
	}

	err = repository.StoreMediaFileMeta(&response)
	if err != nil {
		internalServerErrorResponse(w, "Failed to store Metadata")
		return
	}
	okResponse(w, response)
}
