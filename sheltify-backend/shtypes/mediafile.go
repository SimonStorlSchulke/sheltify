package shtypes

import (
	"gorm.io/gorm"
)

type MediaFile struct {
	gorm.Model
	ID                   string `gorm:"primaryKey"`
	OriginalFileName     string
	Title                string
	Description          string
	FocusX               float32
	FocusY               float32
	SizesGenerated       bool
	LargestAvailableSize string
	MediaTags            []*Tag `gorm:"many2many:media_file_tags;"`
	TenantID             string
	Tenant               *Tenant
}

func (m MediaFile) Validate() error {
	return nil
}
