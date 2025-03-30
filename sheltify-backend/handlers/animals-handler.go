package handlers

import (
	"fmt"
	"net/http"
	"sheltify-new-backend/datalayer"
	"sheltify-new-backend/shtypes"
)

func GetAnimal(w http.ResponseWriter, r *http.Request) {
	id, err := idFromParameter(w, r)
	if err != nil {
		return
	}

	animal, err := datalayer.GetAnimal(id)

	if err != nil {
		http.NotFound(w, r)
		return
	}
	writeJson(w, r, animal)
}

func GetAnimals(w http.ResponseWriter, r *http.Request) {
	animal, err := datalayer.GetAnimals()

	if err != nil {
		http.NotFound(w, r)
		return
	}
	fmt.Println(animal)
	writeJson(w, r, animal)
}

func PostAnimal(w http.ResponseWriter, r *http.Request) {
	animal := PostValidatable[shtypes.Animal](w, r)
	datalayer.CreateAnimal(animal)
}

func DeleteAnimalById(w http.ResponseWriter, r *http.Request) {

}
