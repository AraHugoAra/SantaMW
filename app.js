const express = require('express')
require('dotenv').config()
const app = express()
const mysql = require('promise-mysql')
const port = process.env.PORT
const categoriesRoutes = require('./routes/categoriesRoutes.js')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const connectionOptions = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.PW_DB, //|| "root",
    port: process.env.PORT_MATRICE //|| 3006
}

mysql.createConnection(connectionOptions)
    .then(async (db) => {
        app.get('/', (req, res) => {
            res.json(`C'est ok. C'est bat. C'est in.`)
        })
        categoriesRoutes(app, db)
        /* // POST new product
        app.post('/products/add', async (req, res) => {
            const name = req.body.name
            const price = req.body.price
            const respDB = await db.query(
                'INSERT INTO products (name, price) VALUES (?, ?)'
                , [name, price])
            res.json({status: 200, respDB})
        })
        // POST new franchise
        app.post('/franchises/add', async (req, res) => {
            const franchiseName = req.body.franchiseName
            const respDB = await db.query(
                'INSERT INTO franchises (franchiseName) VALUES (?)'
                , [franchiseName])
            res.json({status: 200, respDB})
        })
        // POST new movie
        app.post('/movies/add', async (req, res) => {
            const movieTitle = req.body.movieTitle
            const franchiseName = req.body.franchiseName
            const duration = req.body.duration
            const releaseDate = req.body.releaseDate
            const respDB = await db.query(
                'INSERT INTO movies (movieTitle, franchiseName, duration, releaseDate) VALUES (?, ?, ?, ?)'
                , [movieTitle, franchiseName, duration, releaseDate])
            res.json({status: 200, respDB})
        })
        // POST new characters (for loop)
        app.post('/characters/add', async (req, res) => {
            let bodyGender = req.body.gender
            let bodyLength = bodyGender.length
            for(let i=0; i<bodyLength; i++){
                const gender = req.body.gender[i]
                const civilName = req.body.civilName[i]
                const superheroName = req.body.superheroName[i]
                const respDB = await db.query(
                    'INSERT INTO characters (gender, civilName, superheroName) VALUES (?, ?, ?)'
                    , [gender, civilName, superheroName])
                res.json({status: 200, respDB})
            }
        }) */
    })

app.listen(port, () => {console.log(`🏃💨 Server is running`)})