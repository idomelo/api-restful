const router = require('express').Router()

const ProductsController = require('../controller/products')

router.get('/products', ProductsController.get)

module.exports = router
