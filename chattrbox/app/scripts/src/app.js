import SOCKET_INSTANCE from './ws-client';

class ChatApp {
  constructor() {
    console.log('Hello ES6!');
    SOCKET_INSTANCE.init('ws://localhost:3001');

    SOCKET_INSTANCE.registerMessageHandler((data) => {
      console.log(data);
    });

    SOCKET_INSTANCE.registerCloseHandler(() => {
      console.log("I see the connection is being closed");
    });

    SOCKET_INSTANCE.registerOpenHandler(() => {
      let message = new ChatMessage({ message: 'pow!'});
      SOCKET_INSTANCE.sendMessage(message.serialize());
    });

  }
}

class ChatMessage {
  constructor({message: m, user: u='batman', timestamp: t=(new Date()).getTime()}) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
