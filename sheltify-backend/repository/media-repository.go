package repository

import "sheltify-new-backend/shtypes"

func StoreMediaFileMeta(media *shtypes.MediaFile) error {
	if err := db.Create(&media).Error; err != nil {
		return err
	}
	return nil
}
