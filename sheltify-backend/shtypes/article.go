package shtypes

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	Sections []ArticleSection
}

type ArticleSection struct {
	gorm.Model
	ArticleID   uint
	SectionID   uint
	SectionType string
	Section     Section `gorm:"polymorphic:Section;polymorphicValue:base"`
}

type Section interface {
	GetSectionType() string
}

type TextSection struct {
	gorm.Model
	HtmlContent string
}

func (s *TextSection) GetSectionType() string {
	return "text"
}

type MediaSection struct {
	gorm.Model
	MediaFiles []MediaFile
}

func (s *MediaSection) GetSectionType() string {
	return "media"
}

type ColumnsSection struct {
	gorm.Model
	Sections []Section
}

func (s *ColumnsSection) GetSectionType() string {
	return "columns"
}
