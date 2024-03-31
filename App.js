// app.js
const express = require('express');
const cors = require('cors');
const {run} = require('./db');
const routes = require('./src/routes/routes');

const app = express();

run();

// Specify the domains that can access your API
// Specify the domains that can access your API
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

// Use CORS with the specified options
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(8080, () => console.log('Server started'));