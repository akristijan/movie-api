const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId} = require('mongodb')
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


//Routes


