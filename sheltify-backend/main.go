package main

import (
	"net/http"
	"os"
	"path/filepath"
	"sheltify-new-backend/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://localhost:*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	initRoutes(r)
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "uploads"))
	handlers.FileServer(r, "/api/uploads", filesDir)

	http.ListenAndServe(":3000", r)
}
