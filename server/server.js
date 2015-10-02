var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = "db.json";
var numUsers = 0;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use("/img", express.static('../img'));
app.use("/lib", express.static('../lib'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/events', function (req, res) {
  fs.readFile( db, 'utf8', function (err, data) {
      res.type('json');
      if (err) {
        res.status(500).json({ error: err});
      }else{
        res.status(200).json(JSON.parse(data));
      }
  });
});

app.post('/events/save', function (req, res) {
  fs.readFile( db, 'utf8', function (err, data) {
      var saved_data = JSON.parse(data);
      saved_data.events.push(req.body);
      fs.writeFile(db, JSON.stringify(saved_data), function(err) {
        if(err) {
          res.status(500).json({result:"fail"});
        }else{
          res.status(200).json({result:"sucess"});
        }
      });
  });
});

io.on('connection', function (socket) {
  ++numUsers;
  io.emit('user joined', { numUsers: numUsers });

  socket.on('new event', function (data) {
    io.emit('new event', data);
  });

  socket.on('disconnect', function () {
    --numUsers;
    socket.broadcast.emit('user left', { numUsers: numUsers });
  });

});

/*fs.watchFile(db, function (curr, prev) {
  console.log('archivo modificado: ' + curr.mtime);
  io.emit('file changed', {});
});*/

var server = http.listen(8080, function () {
  	var port = server.address().port;
  	console.log('Listening on port %s', port);
});