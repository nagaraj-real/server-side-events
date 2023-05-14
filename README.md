# Server Side Events

The goal of this repo is to showcase different ways to send data from server to client.
The server and the client use both Server side events and and web sockets to share data.

Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via an HTTP connection, and describes how servers can initiate data transmission towards clients once an initial client connection has been established. They are commonly used to send message updates or continuous data streams to a browser client and designed to enhance native, cross-browser streaming through a JavaScript API called EventSource, through which a client requests a particular URL in order to receive an event stream.

We need to add request headers that enable Server Side Events. Content Type must be set to **text/event-stream** and connection set to **keep-alive**.

```js
res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Connection", "keep-alive");
```

SSE Manager is used as an event emmiter with a listener registered at API route - http://localhost:3000/sse. The message recieved is the written to the response.

```js
function onSSEMessage(data) {
  res.write(`data: ${testData}\n\n`);
  res.write(`data: ${data}\n\n`);
  res.end();
}
```

On the client side, Event Source API can be used to register the SSE endpoint and listen to messages.

```js
let source = new EventSource("http://localhost:3000/sse");
source.onmessage = function (event) {
  console.log("SSE", event);
};
```
