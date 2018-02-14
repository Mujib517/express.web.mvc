var ws = require('nodejs-websocket');

function handleRequest(connection) {
    console.log("A new connection established");

    connection.on("text", function (msg) {
        server.connections.forEach(con => con.send(msg));
    });
}



var server = ws.createServer(handleRequest);
server.listen(3000, () => console.log("Server is running on 3000"));
