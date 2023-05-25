var http = require('http');

var server = http.createServer(function(peticion,respuesta){
    respuesta.writeHead(200, {'content-type': 'text/html'});
    respuesta.write("respuesta para la direccion" + peticion.url );
    console.log("peticion web");
});

server.listen(3000);  

console.log("Ejecuntado servidor....::::");