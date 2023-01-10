package domain

/*
Package domain implements the data types in use by the service and repository packages.
Additionally, it defines repository and service interfaces for the CCAC application.
The service layer defines the business logic of the application, for the CCAC application the defined services are:
live events and photo gallery services, and for the e-commerce functionalities the shopping cart and product services.
Package domain also defines the repository interfaces for each of the services, in order to keep separation of concerns
between data access layer, and service layer.
*/

type ID string

func (id ID) String() string {
	return string(id)
}

func IDFromString(id string) ID {
	return ID(id)
}

const (
	CCACDatabase = "ccac"
)
