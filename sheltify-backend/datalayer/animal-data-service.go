package datalayer

import (
	"sheltify-new-backend/shtypes"
)

func CreateAnimal(animal *shtypes.Animal) {
	db.Create(&animal)
}

func DeleteAnimal(id int) {
	db.Delete(&shtypes.Animal{}, id)
}

func GetAnimal(id int) (*shtypes.Animal, error) {
	var animal shtypes.Animal
	if err := db.First(&animal, id).Error; err != nil {
		return nil, err
	}
	return &animal, nil
}

func GetAnimals() (*[]shtypes.Animal, error) {
	var animals []shtypes.Animal
	if err := db.Find(&animals).Error; err != nil {
		return nil, err
	}
	return &animals, nil
}
