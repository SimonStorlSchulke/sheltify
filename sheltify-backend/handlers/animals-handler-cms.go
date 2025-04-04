package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sheltify-new-backend/repository"
	"sheltify-new-backend/shtypes"
)

func PostAnimal(w http.ResponseWriter, r *http.Request) {
	//TODO get logged in tenant and assign it automatically
	animal := validateRequestBody[shtypes.Animal](w, r)
	if repository.CreateAnimal(animal) != nil {
		internalServerErrorResponse(w, "Could not create animal")
	} else {
		createdResponse(w, animal)
	}
}

func PatchAnimalById(w http.ResponseWriter, r *http.Request) {
	//TODO get logged in tenant and error if tenant doesn't own animal

	// Extract animal ID from the request (assuming it's in the URL)
	id, err := idFromParameter(w, r)
	if err != nil {
		return
	}

	var updates map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
		badRequestResponse(w, "Invalid JSON")
		return
	}

	// Call repository function to update the animal
	if animal, err := repository.UpdateAnimal(id, updates); err != nil {
		internalServerErrorResponse(w, "Could not update animal")
	} else {
		okResponse(w, animal)
	}
}

func DeleteAnimalsByIds(w http.ResponseWriter, r *http.Request) {
	ids, err := idsFromQuery(w, r)
	if err != nil {
		return
	}

	failedForIds := make([]int, 0)
	for _, id := range ids {
		err = repository.DeleteAnimal(id)
		if err != nil {
			failedForIds = append(failedForIds, id)
		}
	}

	if len(failedForIds) == 0 {
		emptyOkResponse(w)
	} else {
		internalServerErrorResponse(w, fmt.Sprint("Failed deleting ids", failedForIds))
	}
}
