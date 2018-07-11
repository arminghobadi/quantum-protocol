import { generateId, logData, logStat } from './utils'
import { Event } from './Event'

export class QuantumNetwork{

  constructor( network /* Object */, message /* Object */){
    this.repeaters = network.repeaters
    this.links = network.links
    this.message = message
    this.sourceRepeater = message.source
    this.targetRepeater = message.repeater
    this.eventQueue = []
    this.cycleCounter = 1
  }

  addEvent(event /* Event */){
    if (event.getEventType() === 'DONE'){

    } else {
      console.log(logData(`## type: ${event.getEventType()} source: ${event.getAction().source.getId()}, target: ${event.getAction().target.getId()}`))
      this.eventQueue.push(event)
    }
    
    
  }

  getEventQueue(){
    return this.eventQueue
  }

  run(){
    console.log(this.repeaters[0].getId())
    this.sourceRepeater.findLinksToEmitMessage(this.message)
      .forEach(link => {
        this.addEvent(new Event('EXTERNAL', {source: this.sourceRepeater, target: link.otherEnd(this.sourceRepeater), link: link}, generateId(), this.message))
      })
    this.cycle()
  }
  
  cycle(){
    console.log(logData(`Cycle ${this.cycleCounter} done`))
    ++this.cycleCounter
    setTimeout(() => this.handleEvents(), 1000 /* miliseconds */)
  }
  
  handleInternal(event){
    
    this.addEvent(event.getAction().source.sendToReceivingQM(event.getAction().target, event.getMessage(), event.getAction().link))
  }
  
  handleExternal(event){
    const message = event.getMessage()
    message.source = ''
    const res = event.getAction().link.send(message, event.getAction().source)
    for ( var i = 0 ; i < res.length ; i++ ){
      this.addEvent(res[i])
    }
  }
  
  handleEvents(){
    var tempQueue = this.eventQueue
    this.eventQueue = []
    for (var i = 0 ; i < tempQueue.length ; i++){
      const event = tempQueue[i]
      switch(event.getEventType()){
        case 'EXTERNAL':
          this.handleExternal(event)
          break
        case 'INTERNAL':
          this.handleInternal(event)
          break
        case 'DONE':
          break
        default:
          break
      }
    }
    if (tempQueue.length !== 0){
      this.cycle()
    }
    else{
      console.log(logData(`--------------`))
      logStat(`--------------`)
    }
  }
  


}