package repository

import (
	"sheltify-new-backend/shtypes"
)

func CreateAnimal(animal *shtypes.Animal) error {
	if err := db.Create(&animal).Error; err != nil {
		return err
	}
	return nil
}

func DeleteAnimal(id int) error {
	return db.Delete(&shtypes.Animal{}, id).Error
}

func GetAnimal(id int) (*shtypes.Animal, error) {
	var animal shtypes.Animal
	// populate AnimalArticle like this:
	//if err := db.Preload("AnimalArticle").First(&animal, id).Error; err != nil {
	if err := db.First(&animal, id).Error; err != nil {
		return nil, err
	}
	return &animal, nil
}

func GetTenantsAnimal(id int, tenant string) (*shtypes.Animal, error) {
	var animal shtypes.Animal
	if err := db.Where("tenant_id = ?", tenant).First(&animal, id).Error; err != nil {
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

func GetTenantsAnimals(tenant string) (*[]shtypes.Animal, error) {
	var animals []shtypes.Animal
	if err := db.Where("tenant_id = ?", tenant).Find(&animals).Error; err != nil {
		return nil, err
	}
	return &animals, nil
}

func UpdateAnimal(id int, updates map[string]interface{}) (*shtypes.Animal, error) {
	// Find the animal by ID
	var animal shtypes.Animal
	if err := db.First(&animal, id).Error; err != nil {
		return nil, err // Return error if animal not found
	}

	// Apply partial updates using GORM's `Updates()`
	if err := db.Model(&animal).Updates(updates).Error; err != nil {
		return nil, err
	}

	return &animal, nil
}
