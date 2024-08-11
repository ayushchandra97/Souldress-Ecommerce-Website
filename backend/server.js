const port = process.env.PORT || 3000
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const cors = require('cors')
const dotenv = require('dotenv')

const Admin = require('./models/Admin')
const Product = require('./models/Product')
const User = require('./models/User')

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204 
  }

app.use(cors(corsOptions))

const database_url = process.env.DATABASE_URL
const adminName = process.env.ADMIN_NAME
const adminPassword = process.env.ADMIN_PASSWORD

// Database connection
mongoose.connect(database_url)


// Multer storage and base64 conversion

const encodeImageToBase64 = (buffer, mimetype) => {
    return `data:${mimetype};base64,${buffer.toString('base64')}`
}

const storage = multer.memoryStorage()

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
  })

// API Creation
app.post('/adminadd', async (req, res) => {
    let check = await Admin.findOne({ adminName: adminName })
    if (!check) {
        const admin = new Admin({
            adminName: adminName,
            password: adminPassword,
        })
    
        await admin.save()
    
        const data = {
            admin: {
                id: admin.id
            }
        }
    
        const token = jwt.sign(data, 'secret_ecom_admin')
        res.json({
            success: true,
            token
        })
    } else {
        res.status(400).json({
            success: false,
            error: "Can't add more admins."
        })
    }

} )

app.post('/adminlogin', async (req,res) => {
    let admin = await Admin.findOne({ adminName: req.body.adminName })
    if (admin) {
        const passCompare = req.body.password === admin.password
        if (passCompare) {
            const data = {
                admin: {
                    id: admin.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom_admin')
            res.json({
                success: true,
                token
            })
        } else {
            res.status(401).json({
                status: 401,
                success: false,
                error: 'Wrong credentials.'
            })
        }
    } else {
        res.status(401).json({
            status: 401,
            success: false,
            error: 'Wrong credentials.'
        })
    }
})

app.get('/', (req, res) => {
    res.send('<center style="padding-top:20px; font-size: 3rem"><h1>Hello</h1><center>')
})

app.post('/upload', upload.single('product'), (req, res) => {
    const imageBase64 = encodeImageToBase64(req.file.buffer, req.file.mimetype)
    res.json({
        success: true,
        image_url: imageBase64,
    })
})

app.post('/addproduct', async (req, res) => {
    
        const products = await Product.find({})
        let id
        if (products.length > 0) {
            let last_product_array = products.slice(-1)
            let last_product = last_product_array[0]
            id = last_product.id + 1
        } else {
            id = 1
        }
        try {
            const product = new Product({
                id: id,
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                new_price: req.body.new_price,
                old_price: req.body.old_price
            })
            console.log(product)
            await product.save()
            res.json({
                success: true,
                name: req.body.name
            })
        } catch (err) {
            console.error(err)
        }
    })

app.delete('/removeproduct', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.body.id })
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }

        res.json({
            success: true,
            name: req.body.name
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (err) {
        console.error(err)
    }
})

app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists!'
        })
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({
        success: true,
        token
    })
})

app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        const passCompare = req.body.password === user.password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({
                success: true,
                token
            })
        } else {
            res.status(401).json({
                success: false,
                error: 'Wrong password'
            })
        }
    } else {
        res.status(401).json({
            success: false,
            error: 'Wrong email id'
        })
    }
})

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(404).send({ errors: "User not found" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()
        } catch (err) {
            res.status(401).send({ errors: "Please authenticate using a valid token" })
        }
    }
}

app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        // console.log("Request headers:", req.headers);
        // console.log("Request body:", req.body)
        
        const productId = req.body.productId
        const quantity = req.body.quantity

        // console.log(productId)
        // console.log(quantity)

        if (!productId || !quantity) {
            return res.status(401).send({ errors: "Missing required fields" })
        }


        let user = await User.findOne({ _id: req.user.id })

        if (!user) {
            return res.status(404).send({ errors: "User not found" })
        }


        let product = await Product.findOne({ id: productId })

        if (!product) {
            return res.status(404).send({ errors: "Product not found" })
        }

        const productPrice = product.new_price

        let cartItem = user.cart.find(item => item.productId === productId)

        if (cartItem) {
            cartItem.quantity += quantity

            if (cartItem.quantity <= 0) {
                return res.status(400).send({errors: "Bad request"})
            }

            cartItem.price = cartItem.quantity * productPrice
        } else {
            let price = productPrice * quantity
            user.cart.push({
                productId,
                quantity,
                price
            })
        }

        await user.save()

        res.status(200).send({
            success: "true",
            cartData: user.cart
        })

    } catch (err) {
        res.status(500).send({
            success: "false",
            errors: "Server error"
        })
    }
})

app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const productId = req.body.productId

        if (!productId) return res.status(404).send({errors: "Not found. Send valid product ID"})

        const user = await User.findOne({_id: req.user.id})
        if (!user) return res.status(404).send({errors: "User not found"})
        let cartItemIndex = user.cart.findIndex(item => item.productId === productId)
        if (cartItemIndex === -1) {
            return res.status(404).send({errors: "Product not found in user cart"})
        }

        // const index = user.cart.indexOf(cartItem)
        user.cart.splice(cartItemIndex, 1)

        await user.save()

        res.status(200).send({success: "true", cart: user.cart})
        
    } catch (err) {
        res.status(500).send({errors: "Server error"})
    }

})

app.get('/cartitems', fetchUser, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        res.status(200).send({success: "true", cart: user.cart})
    } catch (err) {
        res.status(404).send({errors: "User not found"})
    }

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})