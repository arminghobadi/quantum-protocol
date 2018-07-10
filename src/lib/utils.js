const P_LOSS_CHANCE_ = 3 // From 1 to 10
const Q_LOSS_CHANCE_ = 3 // From 1 to 10
const P_SUCCESS_RATE_ = 0 // 0-> all success ; 10 -> all fail
const Q_SUCCESS_RATE_ = 0
const fs = require('fs')
const getRandomNumberWithProbability = require('./actions')
//const { sendToReceivingQM } = require('./QuantumMemory')
const { repeater } = require('./Repeater')
//const { QuantumMemory} = require('./QuantumMemory')

var eventQueue = []

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

function PSuccessRate(){
  return rand1to10() >= P_SUCCESS_RATE_
}

function QSuccessRate(){
  return rand1to10() >= Q_SUCCESS_RATE_
}

function calculateLossP(message /* Object */){
  const rand = rand1to10()
  if (rand < P_LOSS_CHANCE_){
    console.log('rand came less than 3')
    // TODO: this is where the path should die!! it just throws an error right now which i think is good enough!
    // im not sure actually. should i do something else?!
    logStat(`Path died at ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}`)
    return ''
  }
  const messageWithLoss = {
    //source: message.source,
    type: message.type,
    target: message.target,
    visited: message.visited,
    content: message.content.substring(0, Math.floor( (message.content.length * (rand) ) / (10) ) ) || ''
  }
  return messageWithLoss
}

function calculateLossQ(message /* Object */){
  const rand = rand1to10()
  if (rand < Q_LOSS_CHANCE_){
    console.log('rand came less than 3')
    // TODO: this is where the path should die!! it just throws an error right now which i think is good enough!
    // im not sure actually. should i do something else?!
    logStat(`Path died at ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}`)
    return ''
  }
  const messageWithLoss = {
    //source: message.source,
    type: message.type,
    target: message.target,
    visited: message.visited,
    content: message.content.substring(0, Math.floor( (message.content.length * (rand) ) / (10) ) ) || ''
  }
  return messageWithLoss
}

function pushEvent(event /* Event */){
  eventQueue.push(event)
  console.log(`------- type: ${event.getEventType()} source: ${event.getAction().source.getId()}, target: ${event.getAction().target.getId()}`)
  logData(`## type: ${event.getEventType()} source: ${event.getAction().source.getId()}, target: ${event.getAction().target.getId()}`)

}

function cycle(){
  setTimeout(() => handleEvent(), 1000 /* miliseconds */)
}

function handleInternal(event){
  event.getAction().source.sendToReceivingQM(event.getAction().target, event.getMessage(), event.getAction().link)
}

function handleExternal(event){
  message = event.getMessage()
  message.source = ''
  event.getAction().link.send(message, event.getAction().source)
  //event.getAction().source.attemptEntanglementForOneBit(message, event.getAction().link.getTargetQM(event.getAction().source))
}

function handleEvent(){
  var tempQueue = eventQueue
  for ( var i = 0 ; i < tempQueue.length ; i++){
    console.log(tempQueue[i].getEventType())
  }
  eventQueue = []
  for (var i = 0 ; i < tempQueue.length ; i++){
    const event = tempQueue[i]
    if (event.getEventType() === 'EXTERNAL'){
      handleExternal(event)
    }
    if (event.getEventType() === 'INTERNAL'){
      handleInternal(event)
    }
  }
  cycle()
  //console.log(event)
}

//THIS.NAME IS UNDEFINED!!!!
function deadPath(message){
  logData(`${this.name} received: '${message.content}'
    This repeater has already visited ` + message.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
  console.log(`FAIL${this.name} reveived: '${message.content}'
		This repeater has already visited ` + message.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
}

function logData(data){
  fs.appendFile('log.txt', `${data}\n`, 'utf8', (err) => {
    if (err) console.log(err.message)
  })
}

function logStat(data){
  fs.appendFile('stat.txt', `${data}\n`, 'utf8', (err) => {
    if (err) console.log(err.message)
  })
}

function Caro(operation){
  setTimeout(operation, rand1to10() * 500 /* miliseconds */)
}

module.exports = { cycle, generateId, Caro, logData, logStat, calculateLossP, calculateLossQ, rand1to10, PSuccessRate, QSuccessRate, deadPath, pushEvent, handleEvent }
