import { createBrowserRouter } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Gallery from "./components/Gallery/Gallery";
import Home from "./components/Home/Home";
import Order from "./components/Order/Order";
import PayPal from "./components/PayPal/PayPal";
import Shop from "./components/Shop/Shop";
import ShopItem from "./components/ShopItem/ShopItem";
import Tour from "./components/Tour/Tour";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: 'home',
        element: <Home />
    },
    {
        path: 'contact',
        element: <Contact />
    },
    {
        path: 'tour',
        element: <Tour />
    },
    {
        path: 'contact',
        element: <Contact />
    },
    {
        path: 'products',
        element: <Shop />
    },
    {
        path: 'products/:id',
        element: <ShopItem />
    },
    {
        path: 'cart',
        element: <Cart />
    },
    {
        path: 'order/:id',
        element: <Order />
    },
    {
        path: "gallery",
        element: <Gallery />
    },
    {
        path: "pay",
        element: <PayPal />
    }
]);
