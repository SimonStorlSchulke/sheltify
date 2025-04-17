package migrations

import (
	"sheltify-new-backend/shtypes"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	db.AutoMigrate(
		&shtypes.Animal{},
		&shtypes.AnimalArticle{},
		&shtypes.MediaFile{},
		&shtypes.Tag{},
		&shtypes.User{},
		&shtypes.Article{},
		&shtypes.ArticleSection{},
		&shtypes.TextSection{},
		&shtypes.MediaSection{},
	)
}
