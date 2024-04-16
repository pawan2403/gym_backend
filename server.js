require('dotenv').config();
const http = require('http');
const app = require('./index');
const server = http.createServer(app);
// const functions = require("firebase-functions")

server.listen(process.env.PORT, ()=>{
    console.log(`connection is setup at ${process.env.PORT}`)
})

// exports.api = functions.https.onRequest(app)