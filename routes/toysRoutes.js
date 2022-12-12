function toysRoutes(app, db)  {
    // INDEX + JOIN
    app.get('/toys', async (req, res) => {
        const respDB = await db.query(
            'SELECT toys.name, toys.id, toys.description, toys.price, categories.name AS category FROM toys LEFT JOIN categories ON toys.category = categories.id'
            )
        res.json({status: 200, respDB})
    })
    // SHOW
    app.get('/toys/:toyId', async (req, res) => {
        const toyId = req.params.toyId
        const respDB = await db.query(
            'SELECT toys.name, toys.id, toys.description, toys.price, categories.name AS category FROM toys LEFT JOIN categories ON toys.category = categories.id WHERE id = ?'
            ,[toyId])
        res.json({status: 200, respDB})
    })
    // UPDATE
    app.put('/toys/:toyId', async (req, res) => {
        const toyId = req.params.toyId
        const body = {...req.body}
            for(key in body){
                var respDB = await db.query(
                `UPDATE toys SET ? = ? WHERE id = ?`
                ,[key, body[key], parseInt(toyId)])
            }
        res.json({status: 200, respDB})
    })
    // CREATE
    app.post('/toys', async (req, res) => {
        const body = {...req.body}
        for(key in body){
            var respDB = await db.query(
            `INSERT toys ? VALUES ?`
            ,[key, body[key]])
        }
        res.json({status: 200, respDB})
    })
    // DELETE
    app.delete('/toys/:toyId', async (req, res) => {
        const toyId = req.params.toyId
        const respDB = await db.query(
            'DELETE FROM toys WHERE id = ?'
            ,[toyId])
        res.json({status: 200, respDB})
        })
    }

module.exports = toysRoutes