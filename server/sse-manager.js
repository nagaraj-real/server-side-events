import { EventEmitter } from "events";

const SSEManager = new EventEmitter();

SSEManager.sendMessage = (message) => {
  SSEManager.emit("add", message);
};

export default SSEManager;
