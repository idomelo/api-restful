const router = require('express').Router()

const ProductsController = require('../controller/products')

router.get('/products/:id?', ProductsController.get)

module.exports = router
