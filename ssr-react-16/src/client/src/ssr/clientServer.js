require("@babel/register")({
  presets: ["@babel/preset-env"]
});

const express = require('express');
const path = require('path');

const requestHandler = require('./requestHandler');
const app = express();

//static files nd build file reference
app.use(express.static(path.join(__dirname, '../../../../build')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

//for server side rendering
app.use(requestHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Notdff Found');
  err.status = 404;
  next(err);
});

module.exports = app;
