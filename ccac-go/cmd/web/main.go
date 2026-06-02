package main

import (
	"flag"
	"log"
	"os"
	"strings"

	"github.com/ccac-go/controller"
	"github.com/ccac-go/domain"
	"github.com/ccac-go/inmemrepo"
	"github.com/ccac-go/mongodbrepo"
	"github.com/ccac-go/pkg/eventbrite"
	"github.com/ccac-go/service"
)

func main() {
	var host = flag.String("host", os.Getenv("CCAC_HOST"), "host the app listen to")
	var port = flag.String("port", os.Getenv("CCAC_PORT"), "port the app listen to")
	var dsn = flag.String("dsn", os.Getenv("CCAC_DSN"), "DSN (Data Source Name), i.e. database string to connect to")
	var debugMode = flag.Bool("debug", false, "run the application in debug mode")
	var repo = flag.String("repo", os.Getenv("CCAC_REPO"), "repository backend: mongo|inmem")

	flag.Parse()

	repoSelection := strings.ToLower(strings.TrimSpace(*repo))
	if repoSelection == "" {
		repoSelection = "mongo"
	}

	var ps domain.ProductService
	var cs domain.CartService
	var osvc domain.OrderService

	switch repoSelection {
	case "inmem", "mem", "memory", "in-memory":
		// setup product repository-service-controller
		ps = service.NewProductService(inmemrepo.NewProductRepository())

		// setup cart repository-service-controller
		cr := inmemrepo.NewCartRepository()
		go cr.DeleteUnusedCarts()
		cs = service.NewCartService(cr, ps)

		// setup order repository-service-controller
		osvc = service.NewOrderService(inmemrepo.NewOrderRepository(), cs, *debugMode)

	case "mongo", "":
		db, err := mongodbrepo.New(*dsn)
		if err != nil {
			log.Fatal(err)
		}

		// setup product repository-service-controller
		ps = service.NewProductService(mongodbrepo.NewProductRepository(db))

		// setup cart repository-service-controller
		cr := mongodbrepo.NewCartRepository(db)
		go cr.DeleteUnusedCarts()
		cs = service.NewCartService(cr, ps)

		// setup order repository-service-controller
		osvc = service.NewOrderService(mongodbrepo.NewOrderRepository(db), cs, *debugMode)

	default:
		log.Fatalf("unknown repo backend %q (expected mongo|inmem)", repoSelection)
	}

	pc := controller.NewProductController(ps)

	// setup event repository-service-controller
	ebClient := eventbrite.New()
	es := service.NewEventService(inmemrepo.NewEventRepository(), ebClient)
	ec := controller.NewEventController(es)

	cc := controller.NewCartController(cs)

	// setup gallery repository-service-controller
	gc := controller.NewGalleryController(service.NewGalleryService())
	oc := controller.NewOrderController(osvc)

	// setup application
	a := controller.New(*host, *port, pc, ec, cc, gc, oc)

	// run the app
	a.Run()
}
