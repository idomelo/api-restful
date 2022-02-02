const ProductsModel = require('../models/products')

async function get(req, res) {
  const { id } = req.params

  const obj = id ? { _id: id } : null

  const products = await ProductsModel.find(obj)

  res.send(products)
}

async function post(req, res) {
  const { 
    name,
    brand,
    price,
  } = req.body

  const product = new ProductsModel({
    name,
    brand,
    price,
  })

  product.save()
  res.send({
    message: 'success'
  })
}

async function put(req, res) {
  const { id } = req.params

  //Quando é necessário retornar o produto atualizado:
  const product = await ProductsModel.findOneAndUpdate({ _id:id }, req.body, { new: true })

  res.send({
    message: 'success',
    product,
  })

  /* Quando o retorno do item não é essencial
  const product = await ProductsModel.findOne({ _id: id })

  await product.updateOne(req.body)

  res.send({
    message: 'success',
    product,
  })
  */
}

async function del(req, res) {
  const { id } = req.params

  const remove = await ProductsModel.deleteOne({_id: id})

  const message = remove.deletedCount ? 'success' : 'error'

  res.send({
    message,
  })
}

module.exports = {
  get,
  post,
  put,
  del
}
