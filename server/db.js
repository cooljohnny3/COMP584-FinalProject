const assert = require('assert');

module.exports = {
  checkUserName (db, params, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Query for username
    collection.find( { userName: params.userName } ).toArray(function(err, docs) {
      assert.equal(err, null);
      if(Object.keys(docs).length) {
        callback(true)
      } else {
        callback(false)
      }
    })
  },

  login (db, params, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Query for username
    collection.find( { userName: params.userName, password: params.password } ).toArray(function(err, docs) {
      assert.equal(err, null);
      if(Object.keys(docs).length) {
        callback(true)
      } else {
        callback(false)
      }
    })
  },

  addUser (db, params, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    //Check if user exists
    this.checkUserName(db, params, (result) => {
      result = !result;
      if(result) {
        // Insert some documents
        collection.insertOne(
          {userName : params.userName, password: params.password},
          function(err) {
            assert.equal(err, null);
            console.log('Inserted user into users');
            callback(result)
          }
        );
      } else {
        console.log('User already exists');
        callback(result)
      }

    })
  },

  addMessage (db, params, callback) {
    // Get the documents collection
    const collection = db.collection('messages');
    // Update some documents
    collection.insertOne(
      { from: params.from, to: params.to, message: params.message }, 
      function(err, result) {
        assert.equal(err, null);
        console.log('Added message')
        callback(result)
      }
    )
  },

  getMessages (db, params, callback) {
    // Get the documents collection
    const collection = db.collection('messages');
    // Insert some documents
    collection.find( { $or: [ {from: params.user1, to: params.user2}, {from: params.user2, to: params.user1} ] } ).sort({$natural:-1}).limit(50).toArray(
      function(err, docs) {
        assert.equal(err, null);
        console.log('Retrived messages between ' + params.user1 + ' and ' + params.user2);
        callback(docs.reverse());
      }
    )
  }
}