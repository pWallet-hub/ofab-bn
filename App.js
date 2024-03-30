// app.js
const express = require('express');
const run = require('./db');
const authController = require('./src/controllers/authController');

const app = express();

run();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/signup', authController.signup);
app.post('/login', authController.login);

app.listen(8080, () => console.log('Server started'));