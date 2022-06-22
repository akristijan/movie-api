const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb')
const { urlencoded } = require('express')
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and Server is runing on PORT ${process.env.PORT}` )
        })
        db = client.db(dbName)
        collection = db.collection('movies')
    })
    .catch(err => console.log(err))


//Middleware
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes
app.get('/search', async (req, res) => {
    try {
        let result = await collection.aggregate([
            {
                "$Search" : {
                    "autocomplete" : {
                        "query" : `${req.query.query}`,
                        "path" : "title",
                        "fuzzy" : {
                            "maxEdits" : 2,
                            "prefixLength" : 3
                        }
                    }
                }
            }
        ]).toArray()
        res.send(result)
    } catch (error) {
       res.status(500).send({message : error.message})
    }
})

app.get('/get/:id', async (req, res) => {
    try {
        
        let result = await collection.findOne({
            "_id" : ObjectId(req.params.id)
        })
        res.send(result)
    } catch (error) {
        
    }
})