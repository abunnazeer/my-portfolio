const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// ///////all routes here
const settingsRoute = require('./routes/settings');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/////setting routes/////
app.use('/config', settingsRoute);

app.get('/', (reg, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.post('/config', (reg, res) => {
  const logox = reg.body.logoimg;
  console.log(logox);
});
module.exports = app;
