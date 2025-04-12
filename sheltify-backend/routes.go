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
	authRoutes(r)
}

func animalRoutes(r *chi.Mux) {
	r.Get("/api/{tenant}/animals/{id}", handlers.GetAnimalById)
	r.Get("/api/{tenant}/animals", handlers.GetAnimals)
	WithAuth(r).Post("/api/{tenant}/animals", handlers.CreateAnimal)
	WithAuth(r).Patch("/api/{tenant}/animals/{id}", handlers.UpdateAnimalById)
	WithAuth(r).Delete("/api/{tenant}/animals", handlers.DeleteAnimalsByIds)
	WithAuth(r).Patch("/api/{tenant}/animals/{id}/set-portrait", handlers.SetAnimalPortrait)
}

func animalArticleRoutes(r *chi.Mux) {
	r.Get("/api/{tenant}/animal-articles/{name}", handlers.GetAnimalArticleByName)
}

func mediaRoutes(r *chi.Mux) {
	WithAuth(r).Post("/api/{tenant}/media", handlers.UploadMedia)
	WithAuth(r).Post("/api/{tenant}/tags", handlers.CreateTag)
	WithAuth(r).Post("/api/{tenant}/tags/add-to-media", handlers.AddTagToMedia)
	WithAuth(r).Delete("/api/{tenant}/media/{id}", handlers.DeleteMedia)
}

func authRoutes(r *chi.Mux) {
	r.Post("/register", handlers.Register)
	r.Post("/login", handlers.Login)
	WithAuth(r).Get("/logout", handlers.Logout)
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

func WithAuth(r *chi.Mux) chi.Router {
	return r.With(handlers.AuthMiddleware)
}
