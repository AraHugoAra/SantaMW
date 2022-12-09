const express = require('express')
const app = express()
const mysql = require('promise-mysql')

function categorieRoutes(app, db)  {
    // INDEX
    app.get('/categories', async (req, res) => {
        const respDB = await db.query('SELECT * FROM categories')
        res.json({status: 200, respDB})
    })
    // SHOW
    app.get('/categories/:catId', async (req, res) => {
        const catId = req.params.catId
        const respDB = await db.query(
            'SELECT * FROM categories WHERE id = ?'
            ,[catId])
        res.json({status: 200, respDB})
    })
    // UPDATE
    app.put('/categories/:catId', async (req, res) => {
        const catId = req.params.catId
        const newName = req.body.name
        const respDB = await db.query(
            'UPDATE categories SET name = ? WHERE id = ?'
            ,[newName, catId])
        res.json({status: 200, respDB})
    })
    // CREATE
    app.post('/categories', async (req, res) => {
        const name = req.body.name
        const respDB = await db.query(
            'INSERT INTO categories (name) VALUES (?)'
            , [name])
        res.json({status: 200, respDB})
    })
    // DELETE
    app.delete('/categories/:catId', async (req, res) => {
        const catId = req.params.catId
        const respDB = await db.query(
            'DELETE FROM categories WHERE id = ?'
            ,[catId])
        res.json({status: 200, respDB})
        })
    }

module.exports = categorieRoutes