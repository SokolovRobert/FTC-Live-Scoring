// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('..')(server);
var port = process.env.PORT || 80;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var myData = require('./data.js')
var ejs = require('./node_modules/ejs/ejs.js');




server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
//yummy
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json

// We can setup Jade now!
app.set('view engine', 'ejs');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

app.get("/clientTest", function(request, response){
  response.render("pages/clientTest", { pageTitle: "Welcome, please log in or create an account" });
});

app.get("/display", function(request, response){
  response.render("pages/display", { pageTitle: "Welcome, please log in or create an account" });
});

app.get("/timer", function(request, response){
  response.render("pages/timer", { pageTitle: "Welcome, please log in or create an account" });
});

app.get("/blueBoth", function(request, response){
  response.render("pages/blueBoth", { pageTitle: "Welcome, please log in or create an account" });
});

app.get("/redBoth", function(request, response){
  response.render("pages/redBoth", { pageTitle: "Welcome, please log in or create an account" });
});

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;


  socket.on('addScore', function (data) {
    console.log("addReceived");
    socket.broadcast.emit('addScore', {
      zone: data
    });
  });

  socket.on('subScore', function (data) {
    socket.broadcast.emit('subScore', {
      zone: data
    });
  });

  socket.on('reset', function (data) {
    socket.broadcast.emit('reset', {
      auto: data
    });
  });  

  socket.on('setAuto', function () {
    socket.broadcast.emit('setAuto', {
    });
  });  

  socket.on('setTele', function () {
    socket.broadcast.emit('setTele', {
    });
  });    

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
