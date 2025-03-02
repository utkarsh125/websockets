# Websockets

WebSockets are a communication protocol that provides full-duplex (two-way) communication between a client and a server over a single, long-lived connection. Unlike traditional HTTP requests, which are stateless and request-response based, WebSockets enable real-time, continuous communication without the need for repeated requests.

WebSockets operate over TCP and are initiated via an HTTP handshake (using the ws:// or wss:// protocol). Once the connection is established, it remains open, allowing bidirectional data flow between the client and server.

## Why do we need websockets?

WebSockets solve several problems related to real-time communication and efficient data transfer. Here’s why they are needed:

- Low Latency & Real-Time Communication
- Efficient Use of Resources
- Bidirectional Communication
- Better User Experience
- Scalability

**Common Usecases** include Online gaming, Real time WebRTC, Crypto Exchange, etc.

---

`ws`: The ws package is a WebSocket implementation for Node.js.
`WebSocketServer`: A class that creates a WebSocket server instance.
`http`: The built-in Node.js HTTP module to create a basic web server.

### Creating a web server using `http` 
```
const server = http.createServer(function(request: any, response: any){
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("Hi there");
});
```

- `http.createServer(callback)`: Creates an HTTP server that handles incoming HTTP requests.
- The callback function takes request and response objects.
- When an HTTP request is received, it logs the request and sends a response "Hi there" to the client.
- Note: This HTTP server is mainly used to attach the WebSocket server.

### Creating a Websocket layer
```
const wss = new WebSocketServer({ server });
```

- This creates a WebSocket server `wss` and attaches it to the existing `HTTP` server.
- Now, the server can handle both HTTP and WebSocket connections on the same port (8000).

### Handling Websockets Connection
```
wss.on('connection', function connection(socket){
```
- The WebSocket server listens for new client connections.
- When a client connects, a `socket` is created for that client.

### Handling errors
```
    socket.on('error', console.error);
```

- If any error occurs on the WebSocket connection, it is logged to the console.


### Handling incoming messages
```
    socket.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, { binary: isBinary });
            }
        });
    });
```

- When a client sends a message, the message event is triggered.
- The data parameter contains the received message.
- The server broadcasts the message to all connected clients.
- `isBinary`: Indicates whether the message is binary (e.g., files) or a `string`.
- The message is sent to all connected clients whose WebSocket connection is open (`WebSocket.OPEN`).

### Sending an initial message to the client
```
    socket.send('Hello! Message from Server!');
```

- When a new client connects, the server immediately sends them a welcome message:
  "Hello! Message from Server!".

### Starting the server
```
server.listen(8000, function(){
    console.log((new Date() + 'server running on port 8000'));
});
```
- The HTTP/WebSocket server starts listening on port 8000.
- A message is logged to the console to confirm that the server is running.

**Keep in mind that all of this can be replicated using `expressjs` and it is recommended that you deal with `http` that way**
**The `core/http` was used just for learning purpose.**