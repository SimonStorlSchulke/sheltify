package shtypes

import (
	"gorm.io/gorm"
)

type AnimalArticle struct {
	gorm.Model
	Title    string   `json:"title"`
	Animals  []Animal `json:"animals"`
	TenantID string   `json:"teantID"`
	Tenant   Tenant   `json:"teant"`
}

func (a AnimalArticle) Validate() error {
	return nil
}
