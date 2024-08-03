import Login from './pages/Login'
import FallbackUI from './components/FallbackUI'
import Footer from './components/Footer'
import { ErrorBoundary } from 'react-error-boundary'
import { useState, useEffect } from "react"
import Navigation from './components/Navigation'
import Menu from './pages/Menu'


function App() {

  const [loginStatus, setLoginStatus] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(true)

  function checkAuthToken() {
    if(localStorage.getItem("admin-auth-token")) {
      setLoginStatus(true)
    }
  }

  useEffect(() => {
    checkAuthToken()
  }, [loginStatus])

  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>
      <Navigation loginStatus={loginStatus} setShowAllProducts={setShowAllProducts} />
      {loginStatus ? <Menu loginStatus={loginStatus} showAllProducts={showAllProducts} /> : <Login setLoginStatus={setLoginStatus} />}
      <Footer />
    </ErrorBoundary>
  )
}

export default App
