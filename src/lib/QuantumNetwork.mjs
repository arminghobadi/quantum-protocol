import { generateId, logData, logStat, logVis } from './utils'
import { Event } from './Event'
import { Receiver } from './Receiver.mjs';
import { ticker } from './utils.mjs';
import { logGraph } from './utils.mjs';

export class QuantumNetwork{

  constructor( network /* Object */ ){
    this.repeaters = network.repeaters /* Array<Repeater> */
    this.links = network.links  /* Array<Link> */
    this.eventQueue = []
    this.cycleCounter = 1
    this.successfullPaths = []
    
  }

  addEvent(event /* Event */){
      logData(`## type: ${event.getEventType()} source: ${event.getAction().source.getId()}, target: ${event.getAction().target.getId()}`)
      this.eventQueue.push(event)
  }

  getEventQueue(){
    return this.eventQueue
  }

  run(message){
    //console.log(this.repeaters[0].getId())
    if (message === undefined) debugger
    message.source.findLinksToEmitMessage(message)
      .forEach(link => {
        this.addEvent(new Event('EXTERNAL', {source: message.source, target: link.otherEnd(message.source), link: link}, generateId(), message))
      })
    //this.cycle()
    //ticker().setTickFunc(()=>this.handleEvents())
    ticker().tick()
  }
  
  // cycle(){
  //   logData(`Cycle ${this.cycleCounter} done`)
  //   ++this.cycleCounter
  //   //setTimeout(() => this.handleEvents(), 1000 /* miliseconds */)
  //   this.handleEvents()
  // }
  
  handleInternal(event){
    this.addEvent(event.getAction().source.sendToReceivingQM(event.getAction().target, event.getMessage(), event.getAction().link))
  }
  
  handleExternal(event){
    const message = event.getMessage()
    //message.source = ''
    const res = event.getAction().link.send(message, event.getAction().source)
    for ( var i = 0 ; i < res.length ; i++ ){
      this.addEvent(res[i])
    }
  }
  
  handleACK(message){
    this.eventQueue = this.eventQueue.filter( event => event.getMessage().content !== message.content) // TODO: im not sure if its message.id or message.content
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
        case 'ACK':
          this.handleACK(event)
        default:
          break
      }
    }
    if (tempQueue.length !== 0){
      /*this.cycle()*/ ticker().tick()
    }
    else if ( ticker().getTerminate() ){
      console.log('terminate')
      this.onTerminate()
    }
    else{
      if (ticker().tickListeners.length !== 0)
        ticker().tick()
    }
    // ( tempQueue.length !== 0 ) ? 
    //   /*this.cycle()*/ ticker().tick( () => this.handleEvents() ) 
    // : 
    //   ticker().getTerminate() ? this.onTerminate() : ticker().tick(()=>{})
  }

  logGraph(pathLengths){
    if (pathLengths.length !== 0)
    {
      const numberOfSuccessfullPaths = this.successfullPaths.length
      const totalNumberOfCycles = this.cycleCounter - 3
      const minPath = this.successfullPaths[0].split(' ').length - 2
      const numberOfCyclesForTheShortestPath = (minPath * 2) - 1 
      const numberOfUnnecessaryCycles = totalNumberOfCycles - numberOfCyclesForTheShortestPath
      const bitRate = 1/numberOfCyclesForTheShortestPath
      const cost = numberOfUnnecessaryCycles
      const paths = pathLengths.replace(/ /g , "-");
      logGraph(`${numberOfSuccessfullPaths} ${numberOfCyclesForTheShortestPath} ${paths.substring(0,paths.length - 1)} ${numberOfUnnecessaryCycles} ${bitRate} ${cost} `)
    }
    else {
      const numberOfSuccessfullPaths = 0
      const totalNumberOfCycles = this.cycleCounter - 2
      const numberOfCyclesForTheShortestPath = '-'
      const numberOfUnnecessaryCycles = totalNumberOfCycles
      const bitRate = 0
      const cost = numberOfUnnecessaryCycles
      logGraph(`${numberOfSuccessfullPaths} ${numberOfCyclesForTheShortestPath} - ${numberOfUnnecessaryCycles} ${bitRate} ${cost}`)
    }
  }

  onTerminate() {
    logData(`--------------`)
    logStat(`--------------`)
    const numberOfSuccessfullPaths = this.successfullPaths.length
    let pathLengths = ''
    if (numberOfSuccessfullPaths > 0){
      //this.sendAck()
    }
    for ( var i = 0 ; i < numberOfSuccessfullPaths ; i++ ) {
      pathLengths += this.successfullPaths[i].split(' ').length - 2 + ' '
    }
    //this.path.target.receiver.receive(this.path)
    logVis(`${numberOfSuccessfullPaths} ${pathLengths} `)
    //logVis(`${pathLenghts} `)
    this.logGraph(pathLengths)
  }

  handleDead(event){
    const reason =
      (event.getAction().source.isRepeater(event.getAction().source)) ?
        `while doing an EXTERNAL event from repeater ${event.getAction().source.getId()} to ${event.getAction().target.getId()} `
      : `while doing an INTERNAL event from QM ${event.getAction().source.getId()} to ${event.getAction().target.getId()} `
    
    logStat(`Dead Path: ${event.getMessage().visited.reduce((output, repeater) => output + repeater.name + ' ', ' ')} died ${reason} `)
  }

  handleDone(event){
    this.successfullPaths.push(event.getMessage().visited.reduce((output, repeater) => output + repeater.name + ' ', '' ))
    
    const message = event.getMessage()
    this.path = message
    logStat(`^^^^^^Path: ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}. Content received: '${message.content}'`)
    //console.log(`^^^^^^packetNum: ${message.packetNumber}`)
    logVis(`^^^^^^packetNum: ${message.packetNumber}`)
    console.log(`^^^^^^packetNum: ${message.packetNumber}`)
    if (message.type === 'ACK'){
      //message.target.sender.receiveACK(message)
      message.target.onReceivedACK(message)
    }
    else {
      //message.target.receiver.receive(message)
      message.target.onReceivedPackage(message)
    }
    
  }

}