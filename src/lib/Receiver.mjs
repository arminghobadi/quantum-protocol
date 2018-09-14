import { generateId } from "./utils.mjs";
import { logStat } from "./utils.mjs";

export class Receiver{
  constructor(receiver /* Repeater */, network /* QuantumNetwork */){
    this.receiver = receiver
    this.network = network
    this.num = 0
    this.receiver.onReceivedPackage = (message) => this.receive(message)
  }

  receive(message){
    logStat('%%%%receiver' + ++this.num)
    //this.network.run(message)
    this.sendACK({ source: message.target, target: message.source, visited: [this.receiver], content: message.id, type:'ACK', id: generateId(), packetNumber: message.packetNumber })
  }

  sendACK(message){
    // this.receiver.setSender()??
    //this.network.run(message)
  }

}