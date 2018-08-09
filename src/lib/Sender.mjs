import { Receiver } from "./Receiver.mjs";
import { logData } from './utils'
import { logStat } from "./utils.mjs";
import { convertStringToBinary } from "./utils.mjs";
import { generateId } from "./utils.mjs";
import { logVis } from "./utils.mjs";

const TIMEOUT_ = 2000 /* 2 seconds */

export class Sender{
  constructor({sender /* Repeater */, network /* QuantumNetwork */, receiver /* Repeater */, window /* Window */}){
    this.sender = sender
    this.network = network
    this.receiver = new Receiver(receiver, network, this)
    this.target = receiver
    this.sentMessages = []
    this.sender.isSender = true
    this.num = 0
    this.messages = []
    this.window = window
    this.sentPackets = 0
    this.sender.setSender(this) // These look like shit dude! WTF! fix it if you got the time
    this.onFlightMessages = []
    //this.window.setSender(this)
  }

  something(windowAllowance){
    
  }

  generateMessage(string){
    const stb = convertStringToBinary(string)
    //const message = { source: r10, target: r4, visited: [r10], content: 1, type:'Bit', id: generateId() }
    for ( var i = 0 ; i < stb.length ; i++){
      this.messages.push({ source: this.sender, target: this.target, visited: [this.sender], content: stb.charAt(i), type:'Bit', id:generateId() })
    }
    this.sender.onReceivedACK = (message) => this.receiveACK(message)
    this.window.readyForNextMessage = (windowAllowance) => {
      for (var i = 0 ; i < windowAllowance ; i++){
        const nextMsg = this.messages.pop()
        this.onFlightMessages.push(nextMsg)
        // if (nextMsg) this.send(nextMsg)
        // else this.window.stop() // im not sure about this line!!
      }
      if (this.onFlightMessages.length !== 0 ) this.onFlightMessages.forEach(msg => this.send(msg))
      else this.window.stop()
    }
    this.window.run()

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
    if (!this.sentMessages.find( x => x.message.id === message.id ) && !this.onFlightMessages.find(x => x.id === message.content )) debugger
    if (this.sentMessages.find( x => x.message.id === message.id )){
      this.window.messageLost()
      this.send(message)
    } 
    else {
      console.log(logData(logStat('ACK received already')))
    } 
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
    //this.window.messageDelivered()
    const element = this.sentMessages.find(x => x.message.id === message.content)
    if (element){
      clearTimeout(element.timeout)
    }
    if (this.onFlightMessages.find(x => x.id === message.content )) debugger
    if (this.onFlightMessages.length === 1){
      this.onFlightMessages = this.onFlightMessages.filter(x => x.id !== message.content)
      if (this.onFlightMessages.length === 0) this.window.messageDelivered()
    }
    else {
      this.onFlightMessages = this.onFlightMessages.filter(x => x.id !== message.content)
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