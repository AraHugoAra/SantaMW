function categorieRoutes(app, db)  {
    // INDEX
    app.get('/categories', async (req, res) => {
        try {
            const respDB = await db.query('SELECT * FROM categories')
            res.json({status: 200, respDB})
        }
        catch(error) {
            res.send(error)
        }
    })
    // SHOW
    app.get('/categories/:catId', async (req, res) => {
        const catId = req.params.catId
        try{
            const respDB = await db.query(
                'SELECT * FROM categories WHERE id = ?'
                ,[catId])
            res.json({status: 200, respDB}) 
        }
        catch(error){
            res.json(error)
        }
    })
    // UPDATE
    app.put('/categories/:catId', async (req, res) => {
        const catId = req.params.catId
        const newName = req.body.name
        try{
            const respDB = await db.query(
                'UPDATE categories SET name = ? WHERE id = ?'
                ,[newName, catId])
            res.json({status: 200, respDB})
        }
        catch(error) {
            res.json(error)
        }
    })
    // CREATE
    app.post('/categories', async (req, res) => {
        const name = req.body.name
        try {
            const respDB = await db.query(
                'INSERT INTO categories (name) VALUES (?)'
                , [name])
            res.json({status: 200, respDB})
        }
        catch(error) {
            res.json(error)
        }
    })
    // DELETE
    app.delete('/categories/:catId', async (req, res) => {
        const catId = req.params.catId
        try{
            const respDB = await db.query(
                'DELETE FROM categories WHERE id = ?'
                ,[catId])
                res.json({status: 200, respDB})
        }
        catch(error){
            res.json(error)
        }
        })
    // ADDITIONAL
    app.get('/categories/:category_name/toys', async (req, res) => {
        const catName = req.params.category_name
        try{
            const respDB = await db.query(
                'SELECT toys.name, toys.id, toys.description, toys.price, categories.name AS category FROM toys INNER JOIN categories ON toys.category = categories.id WHERE categories.name = ?'
            , [catName])
            res.json({status: 200, respDB})
        }
        catch(error){
            res.json(error)
        }
    })
    }

module.exports = categorieRoutes