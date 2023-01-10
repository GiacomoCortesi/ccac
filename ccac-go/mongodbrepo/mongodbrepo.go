package mongodbrepo

import (
	"context"
	"github.com/ccac-go/domain"
	"github.com/shopspring/decimal"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"reflect"
)

/*
Package mongodbrepo provides an implementation for the Mongo Database of the CCAC application repository interface.
It currently implements mongo db backend storage for the product and cart service.
Implementation for gallery and event services can be done, but is out of the scope of the current design.
Mongo DB repository makes use of the bson tags in the domain package, for true data layer separation, the implementation
may implement its own data structures. It shall therefore provide mapper functions for converting back and forth domain
and own database representation.
*/

func New(dsn string) (*mongo.Database, error) {
	// register custom codecs
	opts := options.Client().SetRegistry(
		bson.NewRegistryBuilder().
			RegisterCodec(reflect.TypeOf(decimal.Decimal{}), &DecimalCodec{}).
			RegisterCodec(reflect.TypeOf(domain.ID("")), &IDCodec{}).
			Build()).ApplyURI(dsn)

	// instantiate mongo client
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		return nil, err
	}

	// verify client connectivity
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}
	return client.Database(domain.CCACDatabase), nil
}
