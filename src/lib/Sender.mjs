import { Receiver } from "./Receiver.mjs";
import { logData } from './utils'
import { logStat } from "./utils.mjs";
import { convertStringToBinary } from "./utils.mjs";
import { generateId } from "./utils.mjs";
import { logVis } from "./utils.mjs";

const TIMEOUT_ = 2000 /* 2 seconds */

export class Sender{
  constructor({sender /* Repeater */, network /* QuantumNetwork */, receiver /* Repeater */, window /* Window */}){
    // TODO: the message here shouldnt be an object. it should just be a string ( or whatever ) and then make the object here, then send it
    this.sender = sender
    this.network = network
    this.receiver = new Receiver(receiver, network, this)
    this.target = receiver
    this.sentMessages = []
    this.sender.setSender(this)
    this.sender.isSender = true
    this.num = 0
    this.messages = []
    this.window = window
    this.sentPackets = 0
  }

  generateMessage(string){
    const stb = convertStringToBinary(string)
    //const message = { source: r10, target: r4, visited: [r10], content: 1, type:'Bit', id: generateId() }
    for ( var i = 0 ; i < stb.length ; i++){
      this.messages.push({ source: this.sender, target: this.target, visited: [this.sender], content: stb.charAt(i), type:'Bit', id:generateId() })
    }

    // for ( var i = 0 ; i < this.messages.length ; i++){
    //   this.send(this.messages[i])
    // }
    //console.log(logVis(this.messages.length + " brrrrrrrrr")) length is 35

  }

  sendNextPackage(){
    const numberOfPackagesToSend = this.window.isReady()
    for (this.sentPackets ; this.sentPackets < numberOfPackagesToSend+this.sentPackets ; this.sentPackets++){
      this.window.addWindowEvent({func: this.send, message: this.messages[this.sentPackets]})
    }
  }

  // getNextPackage(startingPackageNum, numberOfPackages){
  //   return this.messages.slice(startingPackageNum, numberOfPackages+startingPackageNum)
  // }

  handleTimeout(message){
    this.sentMessages.find( x => x.message.id === message.id ) 
    ? 
      this.send(message)
    : 
      console.log(logData(logStat('ACK received already')))
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


  // when ack received, i should delete the approprieate windowEvent from windowEventQueue, then call the `sendNextPackage()`
  // i should also increase the window size. also, when timeout happens, window should be aware of that
  receiveACK(message){
    logStat('%%%%sender' + ++this.num)
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