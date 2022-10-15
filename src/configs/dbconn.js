require("dotenv").config();
const { MongoClient } = require("mongodb");

// Connection URL
const url = process.env.DB_CONN;
const client = new MongoClient(url);

// Database Name
const dbName = "event_info";
const collection_name = "events";

async function connect() {
  await client.connect();
  console.log("Connected successfully to database");
  const db = client.db(dbName);
  const collection = db.collection(collection_name);
  return collection;
}

module.exports = {
  connect,
};
