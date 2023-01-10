package main

import (
	"flag"
	"github.com/ccac-go/controller"
	"github.com/ccac-go/inmemrepo"
	"github.com/ccac-go/mongodbrepo"
	"github.com/ccac-go/pkg/eventbrite"
	"github.com/ccac-go/service"
	"log"
	"os"
)

func main() {
	var host = flag.String("host", os.Getenv("CCAC_HOST"), "host the app listen to")
	var port = flag.String("port", os.Getenv("CCAC_PORT"), "port the app listen to")
	var dsn = flag.String("dsn", os.Getenv("CCAC_DSN"), "DSN (Data Source Name), i.e. database string to connect to")
	var debugMode = flag.Bool("debug", false, "run the application in debug mode")

	flag.Parse()

	db, err := mongodbrepo.New(*dsn)
	if err != nil {
		log.Fatal(err)
	}

	// setup product repository-service-controller
	ps := service.NewProductService(mongodbrepo.NewProductRepository(db))
	pc := controller.NewProductController(ps)

	// setup event repository-service-controller
	ebClient := eventbrite.New()
	es := service.NewEventService(inmemrepo.NewEventRepository(), ebClient)
	ec := controller.NewEventController(es)

	// setup cart repository-service-controller
	cr := mongodbrepo.NewCartRepository(db)
	go cr.DeleteUnusedCarts()
	cs := service.NewCartService(cr, ps)
	cc := controller.NewCartController(cs)

	// setup gallery repository-service-controller
	gc := controller.NewGalleryController(service.NewGalleryService())
	osvc := service.NewOrderService(mongodbrepo.NewOrderRepository(db), cs, *debugMode)
	oc := controller.NewOrderController(osvc)

	// setup application
	a := controller.New(*host, *port, pc, ec, cc, gc, oc)

	// run the app
	a.Run()
}
