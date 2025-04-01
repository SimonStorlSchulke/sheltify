package shtypes

import "gorm.io/gorm"

type MediaFile struct {
	gorm.Model
	FileName    string  `gorm:"primaryKey" json:"fileName"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	FocusX      float32 `json:"focusX"`
	FocusY      float32 `json:"focusY"`
}
