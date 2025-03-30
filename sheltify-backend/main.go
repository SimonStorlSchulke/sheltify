package main

import (
	"net/http"
	"sheltify-new-backend/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	handleAnimals(r)
	http.ListenAndServe(":3000", r)
}

func handleAnimals(r *chi.Mux) {
	r.Get("/api/animal/{id}", handlers.GetAnimal)
	r.Get("/api/animals", handlers.GetAnimals)
	r.Post("/api/animals", handlers.PostAnimal)

}
