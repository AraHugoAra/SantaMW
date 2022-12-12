const express = require('express')
require('dotenv').config()
const app = express()
const mysql = require('promise-mysql')
const port = process.env.PORT
const categoriesRoutes = require('./routes/categoriesRoutes.js')
const toysRoutes = require('./routes/toysRoutes.js')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const connectionOptions = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.PW_DB,
    port: process.env.PORT_MATRICE
}

mysql.createConnection(connectionOptions)
    .then(async (db) => {
        categoriesRoutes(app, db)
        toysRoutes(app, db)
    })

app.listen(port, () => {console.log(`🏃💨 Server is running`)})