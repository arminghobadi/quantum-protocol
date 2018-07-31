import { generateId } from "./utils.mjs";
import { logStat } from "./utils.mjs";

export class Receiver{
  constructor(receiver /* Repeater */, network /* QuantumNetwork */){
    this.receiver = receiver
    this.network = network
    this.receiver.setReceiver(this)
    this.receiver.isReceiver = true
    this.num = 0
  }

  receive(message){
    this.sendACK({ source: message.target, target: message.source, visited: [this.receiver], content: message.id, type:'ACK', id: generateId() })
    logStat('%%%%receiver' + ++this.num)
  }

  sendACK(message){
    // this.receiver.setSender()??
    this.network.run(message)
  }

}