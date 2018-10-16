var http = require('http');
var url = require('url');
var fs = require('fs');
let IDCount = 0;


// Web File server configuraion.
// -----------------------------------
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



// Websocket server configuraion.
// -----------------------------------
var WebSocketServer = require('websocket').server;
var server = http.createServer(function(request, response) {});

server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket message received.
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message
      let msg = message.utf8Data;
      //console.log("Message received : " + message.utf8Data);
      if(msg == "publisher"){
        console.log("New Publisher!")
        connection.send("id:" + IDCount);
        IDCount++;
      }else if(msg == "subscriber"){
        console.log("New Subscriber!")
        connection.send("id:" + IDCount);
        connection.send("THE LIST");
        IDCount++;
      }else{
        console.log("DEBUG :: " + msg);
      }
    }
  });

  connection.on('close', function(connection) {
    // close user connection
    console.log("Disconnected!");
  });
});


