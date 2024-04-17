require('dotenv').config();
const http = require('http');
const app = require('./index');
const server = http.createServer(app);
// const functions = require("firebase-functions")
const port = process.env.PORT || 4000;

server.listen(10000,'0.0.0.0', ()=>{
    console.log(`connection is setup at ${process.env.PORT}`)
})


// exports.api = functions.https.onRequest(app)
