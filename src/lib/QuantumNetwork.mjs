import { generateId, logData, logStat, logVis } from './utils'
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
    this.successfullPaths = []
  }

  addEvent(event /* Event */){
      console.log(logData(`## type: ${event.getEventType()} source: ${event.getAction().source.getId()}, target: ${event.getAction().target.getId()}`))
      this.eventQueue.push(event)
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
    let tempQueue = this.eventQueue
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
          this.handleDone(event)
          break
        case 'DEAD':
          this.handleDead(event)
          break
        default:
          break
      }
    }
    ( tempQueue.length !== 0 ) ? this.cycle() : this.onTerminate()
  }

  onTerminate() {
    console.log(logData(`--------------`))
    logStat(`--------------`)
    const numberOfSuccessfullPaths = this.successfullPaths.length
    let pathLenghts = ''
    for ( var i = 0 ; i < numberOfSuccessfullPaths ; i++ ) {
      pathLenghts += this.successfullPaths[i].split(' ').length - 1 + ' '
    }
    console.log(logVis(`${numberOfSuccessfullPaths} ${pathLenghts} `))
  }

  handleDead(event){
    const reason =
      (event.getAction().source.isRepeater(event.getAction().source)) ?
        `while doing an EXTERNAL event from repeater ${event.getAction().source.getId()} to ${event.getAction().target.getId()} `
      : `while doing an INTERNAL event from QM ${event.getAction().source.getId()} to ${event.getAction().target.getId()} `
    
    console.log(logStat(`Dead Path: ${event.getMessage().visited.reduce((output, repeater) => output + repeater.name + ' ', ' ')} died ${reason} `))
  }

  handleDone(event){
    this.successfullPaths.push(event.getMessage().visited.reduce((output, repeater) => output + repeater.name + ' ', '' ))
    const message = event.getMessage()
    console.log(logStat(`Path: ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}. Content received: '${message.content}'`))
  }

}