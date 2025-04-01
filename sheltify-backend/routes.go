package main

import (
	"sheltify-new-backend/handlers"

	"github.com/go-chi/chi/v5"
)

func initRoutes(r *chi.Mux) {
	animalRoutes(r)
	animalArticleRoutes(r)
	mediaRoutes(r)
}

func animalRoutes(r *chi.Mux) {
	r.Get("/api/{tenant}/animals/{id}", handlers.GetTenantsAnimalById)
	r.Get("/api/{tenant}/animals", handlers.GetTenantsAnimals)
	r.Post("/api/animals", handlers.PostAnimal)
	r.Patch("/api/animals/{id}", handlers.PatchAnimalById)
	r.Delete("/api/animals/{id}", handlers.DeleteAnimalById)
}

func animalArticleRoutes(r *chi.Mux) {
	r.Get("/api/{tenant}/animalarticle/{name}", handlers.GetAnimalArticleByName)
}

func mediaRoutes(r *chi.Mux) {
	r.Post("/api/upload", handlers.UploadFile)
}
