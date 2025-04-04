package handlers

import (
	"net/http"
	"path/filepath"
	"sheltify-new-backend/repository"
	"sheltify-new-backend/services"
	"sheltify-new-backend/shtypes"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func UploadMedia(w http.ResponseWriter, r *http.Request) {

	// upload 25 MB max
	r.ParseMultipartForm(25 << 20)
	uploadedFile, handler, err := r.FormFile("file")
	if err != nil {
		internalServerErrorResponse(w, err.Error())
		return
	}
	defer uploadedFile.Close()

	uuid := uuid.NewString()
	extension := filepath.Ext(handler.Filename)
	filename := uuid + extension
	savePath := filepath.Join("uploads", filename)

	focusX, err := strconv.ParseFloat(r.FormValue("FocusX"), 32)
	focusY, err := strconv.ParseFloat(r.FormValue("FocusY"), 32)

	if err != nil {
		badRequestResponse(w, "FocusX and FocusY must be numbers")
		return
	}

	entity := shtypes.MediaFile{
		ID:               uuid,
		OriginalFileName: handler.Filename,
		Title:            r.FormValue("Title"),
		Description:      r.FormValue("Description"),
		FocusX:           float32(focusX),
		FocusY:           float32(focusY),
		TenantID:         r.FormValue("TenantID"),
	}

	err = entity.Validate()
	if err != nil {
		badRequestResponse(w, err.Error())
		return
	}

	err = repository.CreateMediaFileMeta(&entity)
	if err != nil {
		internalServerErrorResponse(w, "Failed to store Metadata")
		return
	}

	err = services.StoreMultiPartFile(uploadedFile, savePath)
	if err != nil {
		internalServerErrorResponse(w, err.Error())
		repository.DeleteMediaFileMeta(uuid)
		return
	}

	createdResponse(w, entity)
	services.GenerateImageSizes(&entity)
}

func DeleteMedia(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		badRequestResponse(w, "media id must be provided")
		return
	}
	services.DeleteMedia(id)
}

func CreateTag(w http.ResponseWriter, r *http.Request) {
	tag := parseRequestBody[shtypes.Tag](w, r)
	if repository.CreateTag(tag) != nil {
		internalServerErrorResponse(w, "Could not create mediatag")
	} else {
		createdResponse(w, tag)
	}
}

type AddTagToMediaRequest struct {
	MediaId  string
	TagNames []string
}

func AddTagToMedia(w http.ResponseWriter, r *http.Request) {
	request := parseRequestBody[AddTagToMediaRequest](w, r)
	if request == nil {
		return
	}

	if services.AddTagToMedia(request.MediaId, request.TagNames) != nil {
		internalServerErrorResponse(w, "Could not add mediatag to media")
	} else {
		emptyOkResponse(w)
	}
}
