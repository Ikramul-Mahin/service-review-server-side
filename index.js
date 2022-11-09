//base
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle
app.use(cors())
app.use(express.json())

//mongo db
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v0uxjmt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const tutionCollection = client.db('Tutions').collection('subjects')
        const reviewCollection = client.db('Tutions').collection('reviews')

        app.post('/subject', async (req, res) => {
            const subject = req.body
            const result = await tutionCollection.insertOne(subject)
            console.log(result)
            res.send(result)
        })

        app.get('/subjects', async (req, res) => {
            const query = {}
            const cursor = tutionCollection.find(query)
            const subjects = await cursor.limit(3).toArray()
            res.send(subjects)
        })
        app.get('/subjects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await tutionCollection.findOne(query)
            res.send(result)
        })
        app.get('/allsubjects', async (req, res) => {
            const query = {}
            const cursor = tutionCollection.find(query)
            const subjects = await cursor.toArray()
            res.send(subjects)
        })
        app.get('/allsubjects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await tutionCollection.findOne(query)
            res.send(result)
        })

        //review api
        app.post('/review', async (req, res) => {
            const review = req.body
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })
        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray()
            res.send(reviews)

        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

//test
app.get('/', (req, res) => {
    res.send('Our service server is running on fire.')
})
app.listen(port, () => {
    console.log(`Our service local server is running on ${port}`)
})