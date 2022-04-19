const express = require('express')
const database = require('./config/database')
const routes = require('./routes/index.routes')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

dotenv.config()
database()

app.use(cors())
app.use(express.json())

app.use('/api/users', routes)

app.listen(process.env.PORT, async () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}`)
})
