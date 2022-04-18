const express = require('express')
const database = require('./config/database')
const routes = require('./routes/index.routes')
const dotenv = require('dotenv')
const fetch = require('cross-fetch')
const { apiBaseUrl } = require('./config/riot')

const app = express()

dotenv.config()
database()
app.use(express.json())

app.use('/api/users', routes)

app.listen(3000, async () => {
    console.log('Servidor iniciado na porta 3000')
})
