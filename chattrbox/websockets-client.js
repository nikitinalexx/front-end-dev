var WebSocket = require('ws');
var chatClient = new WebSocket('http://localhost:3001');

chatClient.on('open', function open() {
  chatClient.send('spear-fish');
});

chatClient.on('message', function(data) {
  if (data === 'Hello, Bot!') {
    chatClient.send('Hey, Whats up?');
  }
});
