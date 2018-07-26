import { Receiver } from "./Receiver.mjs";
import { logData } from './utils'

const TIMEOUT_ = 2000 /* 2 seconds */

export class Sender{
  constructor({sender /* Repeater */, network /* QuantumNetwork */, message /* Object */, receiver /* Repeater */}){
    // TODO: the message here shouldnt be an object. it should just be a string ( or whatever ) and then make the object here, then send it
    this.sender = sender
    this.message = message
    this.network = network
    this.receiver = new Receiver(receiver, network, this)
    this.sentMessages = []
    this.sender.setSender(this)
    this.sender.isSender = true
  }

  handleTimeout(message){
    this.sentMessages.find( x => x.message.id === message.id ) 
    ? 
      this.send(message)
    : 
      console.log(logData('ACK received already'))
  }

  send(message){
    //console.log('here' + Date.now())
    this.sentMessages.push({ 
      message, 
      timeout: 
        setTimeout(() => {
          this.handleTimeout(message)
        }, TIMEOUT_) 
    })
    this.network.run(message)
    //this.receiveACK(message)
  }

  receiveACK(message){
    const element = this.sentMessages.find(x => x.message.id === message.content)
    if (element){
      clearTimeout(element.timeout)
    }
    this.network.handleACK(message)
    this.sentMessages.splice( 
      this.sentMessages.indexOf(
        this.sentMessages.find( 
          x => x.message.id === message.id 
        ))
    ,1 )
    
  }
  
} 