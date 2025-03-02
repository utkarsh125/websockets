//This

import WebSocket, {WebSocketServer} from 'ws';

import http from 'http';

const server = http.createServer(function(request: any, response: any){
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("Hi there")
})

const wss = new WebSocketServer({ server });
let userCount = 0;
wss.on('connection', function connection(socket){

    socket.on('error', (err) => console.error(err));

    socket.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary: isBinary});
            }
        })
    })
    console.log("user connected: ", ++userCount);
    socket.send('Hello! Message from Server!');
});

server.listen(8000, function(){
    console.log((new Date() + 'server running on port 8000'));
})