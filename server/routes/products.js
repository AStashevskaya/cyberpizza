const Router = require("express");
const Product = require("../models/Product");
const router = new Router()

router.get('/api/products', getProducts)
router.post('/api/products', sendProducts)

async function getProducts (req, res) {
    try {
        const products = await Product.find()
        
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({ message: error.message })
    } 
}

async function sendProducts(req, res) {
    const product = req.body;

    const newProduct = new Product(product)
    try {
    await newProduct.save()
    res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


module.exports = router;