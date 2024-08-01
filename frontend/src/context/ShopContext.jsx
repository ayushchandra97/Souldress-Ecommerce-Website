import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useErrorBoundary } from "react-error-boundary"

export const ShopContext = createContext(null)


function ShopContextProvider(props) {

  const { showBoundary } = useErrorBoundary()

    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    const [state, setState] = useState('Login')
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    })

    
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/allproducts')
        if (!res.ok) {
          const error = new Error(`${res.status} - ${res.statusText}`)
          error.status = res.status
          error.statusText = res.statusText
          throw error
        }
        const data = await res.json()
        setAllProducts(data)
        setProductsLoaded(true)
      } catch (error) {
        showBoundary(error)
      }
    }

    const addToCart = async (productId, quantity) => {
      if (localStorage.getItem('auth-token')) {
        try {
            const res = await fetch('http://localhost:3000/addtocart', {
              method: 'POST',
              headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                {'productId': productId,
                  'quantity': quantity
                })
            })
            if (!res.ok) {
              const error = new Error(`${res.status} - ${res.statusText}`)
              error.status = res.status
              error.statusText = res.statusText
              throw error
            }
            const data = await res.json()
            data.success ? alert("Product added successfully!") : alert("Something went wrong :(")
            displayCart()

        } catch (error) {
          showBoundary(error)
        }
      }
    }

    const removeFromCart = async (productId) => {
      if (localStorage.getItem('auth-token')) {
        try {
            const res = await fetch('http://localhost:3000/removefromcart', {
              method: 'POST',
              headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({'productId': productId})
            })
            if (!res.ok) {
              const error = new Error(`${res.status} - ${res.statusText}`)
              error.status = res.status
              error.statusText = res.statusText
              throw error
            }
            const data = await res.json()
            data.success ? alert("Removed from cart successfully!"): alert("Something went wrong :(")

        } catch (error) {
          showBoundary(error)
        }
        displayCart()
      }
    }

    const displayCart = async () => {
      if (localStorage.getItem('auth-token')) {
        try {
          const res = await fetch('http://localhost:3000/cartitems', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            }
          })
          if (!res.ok) {
            const error = new Error(`${res.status} - ${res.statusText}`)
            error.status = res.status
            error.statusText = res.statusText
            throw error
          }
          const data = await res.json()
          const cartData = data.cart

          let cartArr =[]
          allProducts.forEach(product => {
            cartData.forEach(element => {
              if (product.id === element.productId) {
              const cartObj = {
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.new_price,
                category: product.category,
                quantity: element.quantity,
                total_price: element.price
              }
              cartArr.push(cartObj)
            }
          })
        });
        setCartItems(cartArr) 
        } catch (error) {
          showBoundary(error)
        }
      }
    }

    useEffect(() => {
        fetchProducts() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (productsLoaded) {
        displayCart()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsLoaded])
  
    function changeHandler(e) {
      setFormData({...formData, [e.target.name]: e.target.value})
    }
  
    async function login() {
      let responseData
      await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((res) => res.json())
      .then((data) => responseData = data)
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token)
        window.location.replace('/')
      } 
      else {
        const err = new Error(responseData.error)
        showBoundary(err)
      }
  
    }
  
    async function signup() {
      console.log('signup', formData)
      let responseData
      await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((res) => res.json())
      .then((data) => responseData = data)
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token)
        window.location.replace('/')
      }
       else {
        const err = new Error(responseData.error)
        showBoundary(err)
      }
  
    }


    const contextValue = {allProducts, state, setState, formData, changeHandler, signup, login, addToCart, removeFromCart, cartItems, productsLoaded}

    return (
        <ShopContext.Provider value={contextValue}>
          {props.children}
        </ShopContext.Provider>
    )
}

ShopContextProvider.propTypes = {
  children: PropTypes.any
}

export default ShopContextProvider
