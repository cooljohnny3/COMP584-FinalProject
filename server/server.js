const assert = require('assert');
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const DB = require('./db')

const app = express()

app.use(bodyParser.json());

// CORS middleware
// consider using CORS package
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
}

app.use(allowCrossDomain)

const url = 'mongodb://localhost:27017'
const dbName = 'finalProject'

app.post('/register', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log('Connected to Mongodb successfully')
    const db = client.db(dbName)
    
    DB.addUser(db, {userName: req.body.userName, password: req.body.password},
      function(result) {
        res.send(result)
        client.close();
      }
    )
  })
})

app.post('/login', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log('Connected to Mongodb successfully')
    const db = client.db(dbName)

    DB.login(db, {userName: req.body.userName, password: req.body.password}, 
      function(result) {
        res.send(result)
        client.close();
      }
    )
  })
})

app.post('/send', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log('Connected to Mongodb successfully')
    const db = client.db(dbName)

    DB.addMessage(db, {user1: req.body.user1, user2: req.body.user2, message: req.body.message}, 
      function(result) {
        res.send(result)
        client.close();
      }
    )
  })
})

app.post('/messages', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log('Connected to Mongodb successfully')
    const db = client.db(dbName)

    DB.getMessages(db, {user1: req.body.user1, user2: req.body.user2},
      function(result) {
        res.send(result)
        client.close();
      }
    )
  })
})

let server = app.listen(3000, () => console.log('Express server started on port 3000'))

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('User connected')
  socket.on('SEND_MESSAGE', function(data) {
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err)
      console.log('Connected to Mongodb successfully')
      const db = client.db(dbName)
  
      DB.addMessage(db, data, function(result) {
        io.emit(data.to, data)
      })
    })
  })
})