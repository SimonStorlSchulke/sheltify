package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

func idFromParameter(w http.ResponseWriter, r *http.Request) (int, error) {
	fmt.Println("id: ", chi.URLParam(r, "id"))
	id, err := strconv.Atoi(chi.URLParam(r, "id"))

	if err != nil {
		http.Error(w, "id must be an integer", http.StatusBadRequest)
		return -1, err
	}
	return id, nil
}

func writeJson(w http.ResponseWriter, r *http.Request, content any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(content)
}
