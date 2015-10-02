var http = require('http');//libreria para crear un servidor
var fs = require("fs");//libreria para manejar archivos
var filename = "./img/purux.jpg"; //variable con el nombre de nuestro archivo

http.createServer(function(request, response){
	fs.readFile(filename,  function(err, data) {// leemos nuestro archivo
		if (err) throw err;
   
        response.writeHead(200,{"Content-Type": 'image/jpeg'});
        response.write(new Buffer(data)); //enviamos el archivo al cliente
        response.end();
    });
}).listen(8080);

console.log("Listening on port 8080...");