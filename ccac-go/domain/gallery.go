package domain

type GalleryService interface {
	Get() (Gallery, error)
}

type GalleryRepository interface {
	Get() (Gallery, error)
}

type Gallery struct {
	Images []string `json:"images"`
}
