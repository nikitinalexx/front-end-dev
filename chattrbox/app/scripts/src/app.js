import SOCKET_INSTANCE from './ws-client';
import {UserStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);

    console.log('Initial constructor call');
    this.reconnect();
  };

  reconnect() {
    console.log('Attempting to reconnect');

    SOCKET_INSTANCE.init('ws://localhost:3001');

    SOCKET_INSTANCE.registerMessageHandler((data) => {
      console.log('i received some data');
      console.log(data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    });

    SOCKET_INSTANCE.registerCloseHandler(() => {
      console.log("I see the connection is being closed");
      if (typeof this.intervalId === "undefined") {
        console.log("Setting interval");
        this.intervalId = setInterval(() => { this.reconnect(); }, 5000);
        console.log("Interval Id " + this.intervalId);
      }
    });

    SOCKET_INSTANCE.registerOpenHandler(() => {
      if (typeof this.intervalId !== "undefined") {
        console.log("Closing interval " + this.intervalId);
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }

      this.chatForm.init((data) => {
        let message = new ChatMessage({message: data});
        SOCKET_INSTANCE.sendMessage(message.serialize());
      })
      
      this.chatList.init();
    });
  };

}

class ChatMessage {
  constructor({
    message: m,
    user: u = username,
    timestamp: t = (new Date()).getTime()
  }) {
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
