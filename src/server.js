const express = require('express')
//const path = require('path')

const routes = require('./routes/routes')
const db = require('./database/db')

const app = express()

//conexão com banco de dados
db.connect()

//Definindo server para receber dados via método post
app.use(express.urlencoded({ extended: true }))

//rotas
app.use('/api', routes)

//executando servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log('listening on port ' + port))