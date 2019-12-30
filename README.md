# async-ws
A websocket lib for both node & browser, with promisify & auto reconnect.

## How to use
```js
const WebSocket = require('async-ws');

(async () => {
  const ws = new WebSocket('xxxx', { binaryType: 'arraybuffer' });

  await ws.ready();
  await ws.send('ping');

  ws.on('open', console.log); // will also be triggered when reconnected. 
  ws.on('message', console.log);
  ws.on('error', console.error);
})();
```