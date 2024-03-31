// app.js
const express = require('express');
const {run} = require('./db');
const routes = require('./src/routes/routes');

const app = express();

run();

app.use(express.json());
app.use(routes);


app.listen(8080, () => console.log('Server started'));