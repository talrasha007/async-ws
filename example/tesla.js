const WebSocket = require('..');

(async function () {
  const ws = new WebSocket('wss://streaming.vn.teslamotors.com/streaming/', { autoReconnect: false });
  ws.on('close', () => console.log('closed'));
  ws.on('message', evt => {
    console.log(evt.toString());
    ws.close();
  });

  await ws.send('ping');
})();