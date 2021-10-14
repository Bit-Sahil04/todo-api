const express = require('express');
require('dotenv').config()
const middlewares = require('./middlewares/index');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI;

app.listen(port);


// app.use('/', (req, res, next) => { console.log("test", req); res.status(500).end() });


mongoose.connect( mongodbURI )
.then(() => console.log("connection to mongodb cluster established", `\nLive on port: ${port}`))
.then(() => app.use(middlewares))
.catch( (err) => console.log(err));