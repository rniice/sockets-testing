var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 80;

server.listen(port);

app.get('/', function (req, res) {
	console.log("sending index.html");
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('client response', function (data) {
  	if(data.my === 'foo') {
  		console.log('received foo!');
	  	socket.emit('server response', { my: 'bar' });
  	}
  	else if(data.my === 'foobar'){
  		console.log('received foobar!')
  		socket.emit('server response', { my: 'complete' });
  	}

  	else{
  		console.log('did not receive foo, or foobar = (')
  	}
  });

  socket.on('disconnect', function(data){
  	console.log('client disconnected');
  });


  socket.on('my other event', function (data) {
    console.log(data);
  });

});
