package handlers

import (
	"encoding/json"
	"net/http"
	"sheltify-new-backend/shtypes"
)

func PostValidatable[K shtypes.Validatable](w http.ResponseWriter, r *http.Request) *K {
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
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(content)

	return &content
}
