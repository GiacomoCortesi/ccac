package mongodbrepo

import (
	"fmt"
	"github.com/ccac-go/domain"
	"github.com/shopspring/decimal"
	"go.mongodb.org/mongo-driver/bson/bsoncodec"
	"go.mongodb.org/mongo-driver/bson/bsonrw"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"reflect"
)

// IDCodec is a ValueCodec that allows encoding domain.ID values into primitive.ObjectID and decoding
// primitive.ObjectID to domain.ID value
type IDCodec struct{}

func (idc *IDCodec) EncodeValue(ectx bsoncodec.EncodeContext, vw bsonrw.ValueWriter, val reflect.Value) error {
	// Use reflection to convert the reflect.Value to string
	id, ok := val.Interface().(domain.ID)
	if !ok {
		return fmt.Errorf("value %v to encode is not of type string", val)
	}
	// Convert string to primitive.ObjectID
	objID, err := primitive.ObjectIDFromHex(id.String())
	if err != nil {
		return fmt.Errorf("error converting string %v to primitive.ObjectID: %v", objID, err)
	}
	return vw.WriteObjectID(objID)
}
func (idc *IDCodec) DecodeValue(ectx bsoncodec.DecodeContext, vr bsonrw.ValueReader, val reflect.Value) error {
	// Read primitive.ObjectID from the ValueReader.
	objID, err := vr.ReadObjectID()
	if err != nil {
		return fmt.Errorf("error reading primitive.ObjectID from ValueReader: %v", err)
	}

	// Convert primitive.ObjectID to string
	stID := objID.Hex()

	// Set val to the string value contained in stID.
	val.Set(reflect.ValueOf(domain.IDFromString(stID)))
	return nil
}

// DecimalCodec is a ValueCodec that allows encoding decimal.Decimal to primitive.Decimal128 and decoding
// primitive.Decimal128 to decimal.Decimal.
type DecimalCodec struct{}

var _ bsoncodec.ValueCodec = &DecimalCodec{}

func (dc *DecimalCodec) EncodeValue(ectx bsoncodec.EncodeContext, vw bsonrw.ValueWriter, val reflect.Value) error {
	// Use reflection to convert the reflect.Value to decimal.Decimal.
	dec, ok := val.Interface().(decimal.Decimal)
	if !ok {
		return fmt.Errorf("value %v to encode is not of type decimal.Decimal", val)
	}
	// Convert decimal.Decimal to primitive.Decimal128.
	primDec, err := primitive.ParseDecimal128(dec.String())
	if err != nil {
		return fmt.Errorf("error converting decimal.Decimal %v to primitive.Decimal128: %v", dec, err)
	}
	return vw.WriteDecimal128(primDec)
}

func (dc *DecimalCodec) DecodeValue(ectx bsoncodec.DecodeContext, vr bsonrw.ValueReader, val reflect.Value) error {
	// Read primitive.Decimal128 from the ValueReader.
	primDec, err := vr.ReadDecimal128()
	if err != nil {
		return fmt.Errorf("error reading primitive.Decimal128 from ValueReader: %v", err)
	}

	// Convert primitive.Decimal128 to decimal.Decimal.
	dec, err := decimal.NewFromString(primDec.String())
	if err != nil {
		return fmt.Errorf("error converting primitive.Decimal128 %v to decimal.Decimal: %v", primDec, err)
	}

	// Set val to the decimal.Decimal value contained in dec.
	val.Set(reflect.ValueOf(dec))
	return nil
}
