package main

import (
	"sheltify-new-backend/handlers"

	"github.com/go-chi/chi/v5"
)

func initRoutes(r *chi.Mux) {
	r.Post("/admin/api/register", handlers.Register)
	r.Post("/admin/api/login", handlers.Login)

	rPublicApi := chi.NewRouter()
	publicRoutes(rPublicApi)
	r.Mount("/api", rPublicApi)

	rAdminApi := chi.NewRouter()
	rAdminApi.Use(handlers.AuthMiddleware)
	adminRoutes(rAdminApi)
	r.Mount("/admin/api", rAdminApi)
}

func publicRoutes(r *chi.Mux) {
	r.Get("/{tenant}/animals/{id}", handlers.GetAnimalById)
	r.Get("/{tenant}/animals", handlers.GetTenantsAnimals)

	r.Get("/animal-articles/{name}", handlers.GetAnimalArticleByName)
}

func adminRoutes(r *chi.Mux) {
	r.Post("/animals", handlers.CreateAnimal)
	r.Patch("/animals/{id}", handlers.UpdateAnimalById)
	r.Delete("/animals", handlers.DeleteAnimalsByIds)
	r.Patch("/animals/{id}/set-portrait", handlers.SetAnimalPortrait)

	r.Post("/media", handlers.UploadMedia)
	r.Post("/tags", handlers.CreateTag)
	r.Post("/tags/add-to-media", handlers.AddTagToMedia)
	r.Delete("/media/{id}", handlers.DeleteMedia)

	r.Get("/logout", handlers.Logout)
	r.Get("/relogin", handlers.Relogin)
}
