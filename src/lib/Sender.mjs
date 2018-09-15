import { Receiver } from "./Receiver.mjs";
import { logData } from './utils'
import { logStat } from "./utils.mjs";
import { convertStringToBinary } from "./utils.mjs";
import { generateId, ticker } from "./utils.mjs";
import { logVis } from "./utils.mjs";

export class Sender{
  constructor({ senderRepeater /* Repeater */, network /* QuantumNetwork */, receiverRepeater /* Repeater */, window /* Window */ }){
    this.senderRepeater = senderRepeater
    this.network = network
    this.receiverRepeater = new Receiver(receiverRepeater, network, this)
    this.target = receiverRepeater
    this.sentMessages = []
    this.messages = []
    this.window = window
    this.sentPackets = 0
    this.onFlightMessages = []
    ticker().setTickFunc(() => this.network.handleEvents())
  }

  generateMessage(string){
    const stb = convertStringToBinary(string)
    //const message = { source: r10, target: r4, visited: [r10], content: 1, type:'Bit', id: generateId() }
    for ( var i = 0 ; i < stb.length ; i++){
      this.messages.push({ source: this.senderRepeater, target: this.target, visited: [this.senderRepeater], content: stb.charAt(i), type:'Bit', id:generateId(), packetNumber: this.messages.length})
    }
    this.senderRepeater.onReceivedACK = (message) => this.receiveACK(message)
    this.window.readyForNextMessage = (windowAllowance) => {
      for (var i = 0 ; i < windowAllowance ; i++){
        this.messages.length ? this.onFlightMessages.push(this.messages.pop()) : ()=>{}
      }
      if (this.onFlightMessages.length !== 0 ) 
        // for (var i = 0 ; i < this.onFlightMessages.length ; i++){
        //   this.send(this.onFlightMessages[i])
        // }
        this.onFlightMessages.forEach(msg => {msg.packetNumber ? (()=>{/*debugger;*/ this.send(msg)})() : this.send(msg)}) //TODO: fix this mf
      else {
        ticker().setTerminate(true)
        this.window.stop()
      }
    }
    this.window.run()

    // for ( var i = 0 ; i < this.messages.length ; i++){
    //   this.send(this.messages[i])
    // }
    //logVis(this.messages.length + " brrrrrrrrr") length is 35

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
      logData(logStat('ACK received already'))
    }
  }

  send(message){
    //debugger
    this.sentMessages.push({
      message,
      timeout: ticker().setTickListener({ tickNum: ticker().getTcpTimeoutTickNum(), fun: () => this.handleTimeout(message), id: generateId() })
    })
    // this.sentMessages.push({ 
    //   message, 
    //   timeout: 
    //     setTimeout(() => {
    //       this.handleTimeout(message)
    //     }, TIMEOUT_) 
    // })
    this.network.run(message)
    //this.receiveACK(message)
  }


  // when ack received, i should delete the approprieate windowEvent from windowEventQueue, then call the `sendNextPackage()`
  // i should also increase the window size. also, when timeout happens, window should be aware of that
  receiveACK(message){
    //this.window.messageDelivered()
    const element = this.sentMessages.find(x => x.message.id === message.content)
    //if (this.onFlightMessages.find(x => x.id === message.content )) debugger
    if (this.onFlightMessages.length === 1){
      this.onFlightMessages = this.onFlightMessages.filter(x => x.id !== message.content)
      if (this.onFlightMessages.length === 0) this.window.messageDelivered()
    }
    else {
      this.onFlightMessages = this.onFlightMessages.filter(x => x.id !== message.content)
    }
    
    var listenerToBeRemoved = this.sentMessages.indexOf(element)
    if (element)
    {
      ticker().removeTickListener(element.timeout)
      this.sentMessages.splice( 
        listenerToBeRemoved
      ,1 )
    }
    this.network.handleACK(message)
  }
  
} 