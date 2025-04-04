package handlers

import (
	"encoding/json"
	"net/http"
	"sheltify-new-backend/shtypes"
)

func validateRequestBody[K shtypes.Validatable](w http.ResponseWriter, r *http.Request) *K {
	var content K

	if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return nil
	}

	if err := content.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return nil
	}

	w.Header().Set("Content-Type", "application/json")

	return &content
}

func parseRequestBody[K interface{}](w http.ResponseWriter, r *http.Request) *K {
	var content K

	if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return nil
	}

	w.Header().Set("Content-Type", "application/json")

	return &content
}
