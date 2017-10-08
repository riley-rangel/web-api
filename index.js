const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

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
