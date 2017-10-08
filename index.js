const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const app = express()

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

app.post('/notes', (req, res) => {
  MongoClient.connect('mongodb://localhost/notepad', (error, db) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.insertOne({})
      .catch(reject => {
        console.error(reject)
        res.sendStatus(404)
      })
      .then(() => {
        res.sendStatus(201)
        db.close()
      })
  })
})

app.listen('3000', () => console.log('Port 3000 Open.'))
