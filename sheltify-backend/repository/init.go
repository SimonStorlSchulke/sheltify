package repository

import (
	"fmt"
	"sheltify-new-backend/migrations"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	dsn := "host=localhost user=backend password=87weuhfriwj3nrkmf dbname=sheltify port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		PrepareStmt: true,
	})

	if err != nil {
		fmt.Println(err)
	}

	migrations.Migrate(db)
}
