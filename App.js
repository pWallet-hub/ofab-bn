// app.js
const express = require('express');
const cors = require('cors');
const {run} = require('./db');
const routes = require('./src/routes/routes');
const cloudinary = require('cloudinary').v2;

const app = express();

run();


const whitelist = ['http://localhost:8080', 'http://localhost:5000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Use CORS with the specified options
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(8080, () => console.log('Server started'));