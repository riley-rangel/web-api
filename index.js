const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')
const uuidv4 = require('uuid/v4')
const bodyParser = require('body-parser')
const app = express()

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/', (req, res) => {
  MongoClient.connect('mongodb://localhost/notepad', (error, db) => {
    if (error) {
      console.error(error)
      res.sendStatus(500)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.insertOne({
      '_id': uuidv4(),
      'date': new Date(),
      'user': 'user',
      'content': req.body.message
    })
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

app.get('/notes', (req, res) => {
  MongoClient.connect('mongodb://localhost/notepad', (error, db) => {
    if (error) {
      console.error(error)
      res.sendStatus(500)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.find().toArray()
      .then(response => {
        res.json(response)
      })
      .catch(reject => {
        console.error(error)
        res.sendStatus(404)
      })
      .then(() => {
        db.close()
      })
  })
})

app.put('/note-id/:id', (req, res) => {
  const id = req.params.id
  MongoClient.connect('mongodb://localhost/notepad', (error, db) => {
    if (error) {
      console.error(error)
      res.sendStatus(500)
      process.exit(1)
    }
    const notes = db.collection('notes')
    notes.updateOne({'_id': id}, {$set: {'content': req.body.message}})
      .then(() => {
        return notes.findOne({'_id': id})
      })
      .then(note => res.json(note))
      .catch(reject => {
        console.error(reject)
        res.sendStatus(404)
      })
      .then(() => db.close())
  })
})

app.delete('/note-id/:id', (req, res) => {
})

app.listen('3000', () => console.log('Port 3000 Open.'))
