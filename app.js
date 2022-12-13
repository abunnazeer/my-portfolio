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
app.use('/', settingsRoute);

app.get('/', (reg, res) => {
  res.render('index', { logo: settingsRoute, spmenu: settingsRoute });
});

module.exports = app;
