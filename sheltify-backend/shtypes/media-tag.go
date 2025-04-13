package shtypes

import (
	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	Name       string       `gorm:"unique"`
	MediaFiles []*MediaFile `gorm:"many2many:media_file_tags;"`
	TenantID   string
	Tenant     *Tenant
}

func (m Tag) Validate() error {
	return nil
}
