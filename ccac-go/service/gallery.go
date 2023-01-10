package service

import (
	"github.com/Davincible/goinsta/v3"
	"github.com/ccac-go/domain"
	"io"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"
)

const (
	imagesPATH = "public/images/gallery"
	imagesURL  = "https://couscousacolazione.com/api/images/gallery/"
	profileIG  = "couscousacolazione"
)

type galleryService struct {
}

func NewGalleryService() domain.GalleryService {
	go IGPicturesDownload()
	return galleryService{}
}

func (g galleryService) Get() (domain.Gallery, error) {
	var images []string
	entries, err := os.ReadDir(imagesPATH)
	if err != nil {
		return domain.Gallery{}, err
	}
	for _, e := range entries {
		images = append(images, imagesURL+e.Name())
	}
	return domain.Gallery{Images: images}, nil
}

func IGPicturesDownload() error {
	c := time.Tick(3600 * time.Second)
	for _ = range c {
		username := os.Getenv("IG_USERNAME")
		password := os.Getenv("IG_PASSWORD")
		insta := goinsta.New(username, password)

		if err := insta.Login(); err != nil {
			return err
		}

		profileName := profileIG
		user, err := insta.Profiles.ByName(profileName)
		if err != nil {
			return err
		}

		var images []string
		feed := user.Feed()
		for feed.Next() {
			for _, media := range feed.Items {
				images = append(images, media.Images.GetBest())
			}
			break
		}

		for i, image := range images {
			f, err := os.Create(path.Join(imagesPATH, "image"+strconv.Itoa(i)+".png"))
			res, err := http.Get(image)
			if err != nil {
				//a.logger.Infof("error retrieving ig images: %s", err.Error())
			}
			_, err = io.Copy(f, res.Body)
			if err != nil {
				//a.logger.Infof("error creating file: %s", err.Error())
			}
		}
		insta.Logout()
	}
	return nil
}
