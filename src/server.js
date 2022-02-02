const express = require('express')
const cors = require('cors')

const routes = require('./routes/routes')
const db = require('./database/db')

const app = express()

//conexão com banco de dados
db.connect()

const allowedOrigins = [
  'http://127.0.0.1:5500'
]

//Habilita CORS
app.use(cors({
  origin: function(origin, callback) {
    let allowed = true

    // permite mobile app
    if (!origin) allowed = true

    if (!allowedOrigins.includes(origin)) allowed = false

    callback(null, allowed)
  }
}))

// Habilitando server para receber dados json
app.use(express.json())

//rotas
app.use('/api', routes)

//executando servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log('listening on port ' + port))