var http = require('http');
var url = require('url');
var fs = require('fs');

// ----------------------------------------------------------
// File server that servers up the static files on port 8080
// ----------------------------------------------------------
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);


// ---------------------------------------------------------------
// Websocket server that tracks and forwards events over port 1337
// ---------------------------------------------------------------
var WebSocketServer = require('websocket').server;

// Setup lists
let subscribers=[];
let publishers=[];

// Init websocket server and start listening on port.
var server = http.createServer(function(request, response) {});
server.listen(1337, function() { });
wsServer = new WebSocketServer({
  httpServer: server
});

// Accepting and parsing the requests..
wsServer.on('request', function(request) {
  var index=0;
  var connection = request.accept(null, request.origin);

  // Actions for when a message is received.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      //console.log("Message received : " + message.utf8Data);

      // If message is a publisher we need to store it in our server registry.
      if (message.utf8Data == "publisher") {
        console.log("Adding new publisher!");
        index = publishers.push(connection)-1;

      // If the message is a subscriber we need to register them also in a list.
      } else if(message.utf8dData == "subscriber") {
        console.log("Adding new subscriber!");
        index = subscribers.push(connection)-1;

      // Otherwise just debug print out the value.
      } else {
        console.log("Message received : " + message.utf8Data);
      }
    }
  });

  // Action for when someone closes the connection.
  connection.on('close', function(connection) {
    console.log("Disconnected!");
  });
});



