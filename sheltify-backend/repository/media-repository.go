package repository

import (
	"sheltify-new-backend/shtypes"
)

func CreateMediaFileMeta(media *shtypes.MediaFile) error {
	if err := db.Create(&media).Error; err != nil {
		return err
	}
	return nil
}

func GetMediaFileMetaById(id string) (*shtypes.MediaFile, error) {

	var mediaFile shtypes.MediaFile

	if err := db.Where("id = ?", id).First(&mediaFile).Error; err != nil {
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

func GetTagByName(name string) (*shtypes.Tag, error) {
	var tag shtypes.Tag
	if err := db.Where("name = ?", name).First(&tag).Error; err != nil {
		return nil, err
	}
	return &tag, nil
}

func UpdateMedia(media *shtypes.MediaFile, updates map[string]interface{}) error {
	if err := db.Model(&media).Updates(updates).Error; err != nil {
		return err
	}
	return nil
}

func SaveMedia(media *shtypes.MediaFile) error {
	if err := db.Save(&media).Error; err != nil {
		return err
	}
	return nil
}
