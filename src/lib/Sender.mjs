import { Receiver } from "./Receiver.mjs";

export class Sender{
  constructor(sender /* Repeater */, network /* QuantumNetwork */, message /* Object */, receiver /* Repeater */){
    // TODO: the message here shouldnt be an object. it should just be a string ( or whatever ) and then make the object here, then send it
    this.sender = sender
    this.network = network
    this.message = message
    this.receiver = receiver
    this.receiver = new Receiver(receiver, network, this)
  }

  send(){
    this.network.run(this.message)
  }

  receiveACK(){

  }
  
}