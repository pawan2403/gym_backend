const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/authroutes');
require('dotenv').config();
const cors = require('cors')
app.use(express.json());
// const MySql = require('./database/dbmysql')

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to mongodb')
}).catch(() => {
    console.log('No Connection to Mongodb')
});

app.use(cors());
app.use('/auth/api/v1',router);
module.exports = app;