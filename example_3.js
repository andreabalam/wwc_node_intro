var http = require('http');
var fs = require("fs");
var filename = "./img/purux_al_volante.jpg";

http.createServer(function(request, response){
	fs.readFile(filename,  function(err, data) {
		if (err) throw err;
   	
        response.writeHead(200, {'Content-Type': 'text/html'}); //enviamos un html al cliente con una imagen
		response.write('<html><body><h3>Hello, this is dog.</h3><img style="height: 500px;" src="data:image/jpeg;base64,')
		response.write(new Buffer(data).toString('base64'));
		response.end('"/></body></html>');
    });
}).listen(8080);

console.log("Listening on port 8080...");
