package shtypes

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Gender string

const (
	Male   Gender = "Male"
	Female Gender = "Female"
)

type Animal struct {
	gorm.Model
	Name            string         `json:"name"`
	Birthday        time.Time      `json:"birthday,omitempty"`
	Castrated       bool           `json:"castrated"`
	Gender          Gender         `json:"gender"`
	AnimalArticleID *uint          `json:"animalArticleID"`
	AnimalArticle   *AnimalArticle `json:"animalArticle"`
	TenantID        string         `json:"tenantID"`
	Tenant          *Tenant        `json:"tenant"`
}

func (a Animal) Validate() error {
	if a.Name == "" {
		return errors.New("name is required")
	}
	if a.Gender != Male && a.Gender != Female {
		return errors.New("gender must be Male or Female")
	}
	return nil
}
