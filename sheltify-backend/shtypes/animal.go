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
	Name            string
	Birthday        *time.Time
	Castrated       bool
	Gender          Gender
	AnimalArticleID *uint
	AnimalArticle   *AnimalArticle
	PortraitID      *string
	Portrait        *MediaFile
	TenantID        string
	Tenant          *Tenant
}

func (a Animal) Validate() error {
	if a.Name == "" {
		return errors.New("name is required")
	}
	if a.TenantID == "" {
		return errors.New("must belong to a tenant")
	}
	if a.Gender != Male && a.Gender != Female {
		return errors.New("gender must be Male or Female")
	}
	return nil
}
