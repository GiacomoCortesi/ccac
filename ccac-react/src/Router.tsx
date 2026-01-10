import { createBrowserRouter } from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Contact from './components/Contact/Contact'
import ErrorPage from './components/ErrorPage/ErrorPage'
import Gallery from './components/Gallery/Gallery'
import Home from './components/Home/Home'
import Order from './components/Order/Order'
import PayPal from './components/PayPal/PayPal'
import Shop from './components/Shop/Shop'
import ShopItem from './components/ShopItem/ShopItem'
import Tour from './components/Tour/Tour'
import Login from './components/Login/Login'
import WareHouse from './components/WareHouse/WareHouse'
import AdminProduct from './components/AdminProduct/AdminProduct'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import AlmaPressKit from './components/AlmaPressKit/AlmaPressKit'
import LucePressKit from './components/LucePressKit/LucePressKit'
import PressKit from './components/PressKit/PressKit'
import Video from './components/Video/Video'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'contact',
    element: <Contact />,
  },
  {
    path: 'tour',
    element: <Tour />,
  },
  {
    path: 'contact',
    element: <Contact />,
  },
  {
    path: 'products',
    element: <Shop />,
  },
  {
    path: 'products/:id',
    element: <ShopItem />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'order/:id',
    element: <Order />,
  },
  {
    path: 'gallery',
    element: <Gallery />,
  },
  {
    path: 'presskit',
    element: <PressKit />,
  },
  {
    path: 'alma-presskit',
    element: <AlmaPressKit />,
  },
  {
    path: 'luce-presskit',
    element: <LucePressKit />,
  },
  {
    path: 'video',
    element: <Video />,
  },
  {
    path: 'pay',
    element: <PayPal />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'admin/warehouse',
    element: (
      <ProtectedRoute>
        <WareHouse />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/warehouse/:id',
    element: (
      <ProtectedRoute>
        <AdminProduct />
      </ProtectedRoute>
    ),
  },
])
