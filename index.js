//base
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//middle
app.use(cors())
app.use(express.json())

//mongo db

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.v0uxjmt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

//test
app.get('/', (req, res) => {
    res.send('Our service server is running on.')
})
app.listen(port, () => {
    console.log(`Our service local server is running on ${port}`)
})