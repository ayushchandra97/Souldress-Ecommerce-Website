import NavBar from './components/NavBar'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import LoginSignUp from './pages/LoginSignUp'
import ShopContextProvider from './context/ShopContext'
import ShopCategory from './pages/ShopCategory'
import Footer from "./components/Footer"
import './CSS/custom2.css'
import AllProducts from './pages/AllProducts'
import { ErrorBoundary } from 'react-error-boundary'
import FallbackUI from './components/FallbackUI'
import NotFound from './components/NotFound'

function App() {

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/allproducts',
          element: <AllProducts />
        },
        {
          path: '/mens',
          element: <ShopCategory category="Mens" />
        },
        {
          path: '/womens',
          element: <ShopCategory category="Womens" />
        },
        {
          path: '/kids',
          element: <ShopCategory category="Kids" />
        },
        {
          path: '/login',
          element: <LoginSignUp />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/product/:productId',
          element: <Product />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </ErrorBoundary>
  )
}

export default App
