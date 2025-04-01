package migrations

import (
	"sheltify-new-backend/shtypes"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&shtypes.Animal{})
	db.AutoMigrate(&shtypes.AnimalArticle{})
	db.AutoMigrate(&shtypes.MediaFile{})
}
