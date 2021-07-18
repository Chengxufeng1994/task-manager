const assert = require('assert');
const mongodb = require('mongodb');

const { MongoClient } = mongodb;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'task-manager';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    console.log('Unable to connect database');
    // Exit process with failure
    process.exit(1);
  }

  assert.equal(null, err);
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('tasks');
});
