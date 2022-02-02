const router = require('express').Router()

const ProductsController = require('../controller/products')

router.get('/products/:id?', ProductsController.get)
router.post('/products/', ProductsController.post)
router.put('/products/:id', ProductsController.put)


module.exports = router
