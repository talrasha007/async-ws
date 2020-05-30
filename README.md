# async-ws
A websocket lib for both node & browser, with promisify & auto reconnect.

## How to use
```js
const WebSocket = require('async-ws');

(async () => {
  // The backend will be global.WebSocket for browser, ws fro node.
  const ws = new WebSocket('xxxx', { autoReconnect: false /* false to disable auto reconnect, otherwise enabled. */, binaryType: 'arraybuffer', options: { /* options for WebSocket or WS */ } });

  await ws.ready();
  await ws.send('ping'); // if socket is not ready, message will be sent after connected. 

  ws.on('open', console.log); // will also be triggered when reconnected. 
  ws.on('message', console.log);
  ws.on('error', console.error);
})();
```