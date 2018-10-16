  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;
  var ID = null;
  var connection = new WebSocket('ws://192.168.0.100:1337');
  connection.onopen = function () {
    connection.send("publisher");
  };

  connection.onmessage = function (evt) {
    var msg = evt.data;
    //console.log("Message is received..." + evt.data);
    var input = msg.split(":");
    if(input[0] == "id"){
       ID = input[1];
    }
  };
