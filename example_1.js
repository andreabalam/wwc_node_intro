var http = require('http'); //libreria para crear un servidor

http.createServer(function(request, response){ //creamos el servidor
	response.writeHead(200); //en cuanto el servidor sea creado, mandamos una respuesta
	response.write("Hello, this is dog.");
	response.end();
}).listen(8080);

console.log("Listening on port 8080..."); //el programa sigue ...