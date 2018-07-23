import { generateId } from "./utils.mjs";

export class Receiver{
  constructor(receiver /* Repeater */, network /* QuantumNetwork */){
    this.receiver = receiver
    this.network = network
  }

  receive(message){
    this.sendACK({ source: message.target, target: message.source, content: message.id, type:'Bit', id: generateId() })
  }

  sendACK(message){
    this.network.run(message)
  }

}