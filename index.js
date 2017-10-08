const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

app.listen('3000', () => console.log('Port 3000 Open.'))
