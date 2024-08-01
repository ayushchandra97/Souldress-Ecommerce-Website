import FallbackUI from './components/FallbackUI'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Navigation from './components/Navigation'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'


function App() {

  const [showAllProducts, setShowAllProducts] = useState(true)

  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>
      <Navigation setShowAllProducts={setShowAllProducts} />
      <Menu showAllProducts={showAllProducts} />
      <Footer />
    </ErrorBoundary>
  )
}

export default App
