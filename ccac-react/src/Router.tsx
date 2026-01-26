import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
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
import { LanguageLayout } from './components/LanguageLayout/LanguageLayout'

// Helper to get default language from browser
const getDefaultLanguage = (): string => {
  if (typeof window === 'undefined') return 'it'
  const browserLang = navigator.language || navigator.languages?.[0] || 'it'
  return browserLang.startsWith('it') ? 'it' : browserLang.startsWith('en') ? 'en' : 'it'
}

// Component to redirect non-prefixed routes to /it/{path}
const LanguageRedirect = () => {
  const location = useLocation()
  const pathname = location.pathname
  
  // Skip admin and login routes - these should be handled by their specific routes
  // If we're here, it means the route doesn't exist, so show error
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return <ErrorPage />
  }
  
  // Skip if already has language prefix - this shouldn't happen in catch-all,
  // but if it does, show error to prevent infinite redirects
  if (pathname.match(/^\/(it|en)(\/|$)/)) {
    return <ErrorPage />
  }
  
  // Redirect to /it + pathname
  return <Navigate to={`/it${pathname}`} replace />
}

export const router = createBrowserRouter([
  // Root redirect to default language
  {
    path: '/',
    element: <Navigate to={`/${getDefaultLanguage()}`} replace />,
  },
  // Language-prefixed routes
  {
    path: '/:lang',
    element: <LanguageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: 'media',
        element: <PressKit />,
      },
      {
        path: 'presskit',
        element: <PressKit />,
      },
      {
        path: 'media/alma-presskit',
        element: <AlmaPressKit />,
      },
      {
        path: 'presskit/alma-presskit',
        element: <AlmaPressKit />,
      },
      {
        path: 'media/luce-presskit',
        element: <LucePressKit />,
      },
      {
        path: 'presskit/luce-presskit',
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
      // Catch-all route for unmatched paths within language routes
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
  // Catch-all route for root-level unmatched paths - redirects to /it/{path}
  {
    path: '*',
    element: <LanguageRedirect />,
  },
  // Admin routes (no language prefix)
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
