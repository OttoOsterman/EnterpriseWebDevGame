// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express = require('express'); // call express
var app = express(); // define our app using express

var mongo = require('mongodb').MongoClient;

var server = require('http').createServer(app); //chat
var io = require('socket.io').listen(server); //require socket.io to make the chat work

// Array for usernames
nicknames = [];

var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect(config.database, { useMongoClient: true });

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// START THE SERVER
// ====================================
//app.listen(config.port);
server.listen(config.port);
console.log('Waiting for something to happen on port ' + config.port);

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ---------------
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function (req, res) {
    console.log('index file requested');
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



io.sockets.on('connection', function (socket) {

    // Get new user
    socket.on('new user', function (data, callback) {
        if (nicknames.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true)
            socket.nickname = data;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames', nicknames);
        }
    });

    // Emit new message
    socket.on('send message', function (data) {
        io.sockets.emit('new message', { msg: data, nick: socket.nickname });
    });

    // Remove user from chat when disconnected
    socket.on('disconnect', function(data) {
            if (!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname),1);
            io.sockets.emit('usernames', nicknames);
        });
});