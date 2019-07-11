var express = require('express.io');
var path = require('path');
var app = express().http().io();
var mysql = require('mysql');
var http = require('http');

// configuring our environments
app.configure(function(){
  app.use(express.cookieParser());  
  app.use(express.json());    //for handling post data
  app.use(express.urlencoded());    //for handling post data
  app.use(express.static(path.join(__dirname, 'public'))); //for handling static contents
  app.use(express.session({secret: 'monkey'})); //for using sessions
  app.set('view engine', 'ejs');
});
//we're going to have /routes/index.js handle all of our routing
var route = require('./routes/index.js')(app);
app.listen(8080);

//create database connection
//more test comments

