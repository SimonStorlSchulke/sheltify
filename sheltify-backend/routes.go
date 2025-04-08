package main

import (
	"net/http"
	"sheltify-new-backend/handlers"

	"github.com/go-chi/chi/v5"
)

func initRoutes(r *chi.Mux) {
	animalRoutes(r)
	animalArticleRoutes(r)
	mediaRoutes(r)
}

func animalRoutes(r *chi.Mux) {
	r.Get("/api/{tenant}/animals/{id}", handlers.GetAnimalById)
	r.Get("/api/{tenant}/animals", handlers.GetAnimals)
	r.Post("/api/{tenant}/animals", handlers.CreateAnimal)
	r.Patch("/api/{tenant}/animals/{id}", handlers.UpdateAnimalById)
	r.Delete("/api/{tenant}/animals", handlers.DeleteAnimalsByIds)
	r.Patch("/api/{tenant}/animals/{id}/set-portrait", handlers.SetAnimalPortrait)
}

func animalArticleRoutes(r *chi.Mux) {
	r.Get("/api/{tenant}/animal-articles/{name}", handlers.GetAnimalArticleByName)
}

func mediaRoutes(r *chi.Mux) {
	r.Post("/api/{tenant}/media", handlers.UploadMedia)
	r.Post("/api/{tenant}/tags", handlers.CreateTag)
	r.Post("/api/{tenant}/tags/add-to-media", handlers.AddTagToMedia)
	r.Delete("/api/{tenant}/media/{id}", handlers.DeleteMedia)
}

func get(r *chi.Mux, pattern string, handlerFn http.HandlerFunc) {
	r.Get("/api/{tenant}/"+pattern, handlerFn)
}

func post(r *chi.Mux, pattern string, handlerFn http.HandlerFunc) {
	r.Post("/api/{tenant}/"+pattern, handlerFn)
}

func patch(r *chi.Mux, pattern string, handlerFn http.HandlerFunc) {
	r.Patch("/api/{tenant}/"+pattern, handlerFn)
}

func delete(r *chi.Mux, pattern string, handlerFn http.HandlerFunc) {
	r.Delete("/api/{tenant}/"+pattern, handlerFn)
}
