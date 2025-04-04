package repository

import (
	"errors"
	"sheltify-new-backend/shtypes"
)

func CreateMediaFileMeta(media *shtypes.MediaFile) error {
	if err := db.Create(&media).Error; err != nil {
		return err
	}
	return nil
}

func GetMediaFileMetaById(id int) (*shtypes.MediaFile, error) {

	var mediaFile shtypes.MediaFile

	if err := db.First(&mediaFile, id).Error; err != nil {
		return nil, err
	}
	return &mediaFile, nil
}

func DeleteMediaFileMeta(id string) error {
	if err := db.Unscoped().Where("id = ?", id).Delete(&shtypes.MediaFile{}).Error; err != nil {
		return err
	}
	return nil
}

func SetSizesGenerated(media *shtypes.MediaFile) error {
	media.SizesGenerated = true
	if err := db.Save(&media).Error; err != nil {
		return err
	}
	return nil
}

func CreateTag(tag *shtypes.Tag) error {
	if err := db.Create(&tag).Error; err != nil {
		return err
	}
	return nil
}

func AddTagToMedia(mediaID string, tags []int) error {
	// Example implementation: Replace with actual database logic.
	mediaFile, err := GetMediaFileMetaById(mediaID)
	if err != nil {
		return err
	}

	mediaFile.Tags = append(mediaFile.Tags, tag)
	err = UpdateMediaFile(mediaFile)
	if err != nil {
		return errors.New("failed to update media file with new tag")
	}

	return nil
}
