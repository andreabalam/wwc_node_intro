var express = require('express'); //usamos la libreria express
var app = express();

app.get('/', function (req, res) { //express maneja nuestras rutas
  	res.send('Hello, this is dog, again'); //podemos enviar texto..
});

app.get('/hello', function(req, res) {
    res.sendFile(__dirname + '/hello.html');//..archivos
});

app.use("/img", express.static(__dirname + '/img')); //y nuestros scripts, css, imagenes, etc.


var server = app.listen(8080, function () { //express maneja nuestro servidor
  	var port = server.address().port;
  	console.log('Listening on port %s', port);
});