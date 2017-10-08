const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/notes', (error, db) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  app.post('/', (req, res) => {
    res.send('connection OK')
  })
  db.close()
})

app.listen('3000', () => console.log('Port 3000 Open.'))
