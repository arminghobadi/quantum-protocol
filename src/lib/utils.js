const P_LOSS_CHANCE_ = 3 // From 1 to 10
const Q_LOSS_CHANCE_ = 3 // From 1 to 10
const P_SUCCESS_RATE_ = 5 // 0-> all success ; 10 -> all fail
const Q_SUCCESS_RATE_ = 5
const fs = require('fs')
const getRandomNumberWithProbability = require('./actions')

var eventQueue = []
var cycleCounter = 1

function convertStringToBinary(messageContent) {
  var res = ''
  for (var i = 0; i < messageContent.length; i++) {
      res += messageContent[i].charCodeAt(0).toString(2) + " "
  }
  return res
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9)
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
    console.log('rand came less than 3 in calculateLossP')
    logStat(`Path died at ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}`)
    return ''
  }
  const messageWithUpdatedContent = 
    Object.assign(
      {},
      message,
      { content: message.content.substring(0, Math.floor( (message.content.length * (rand) ) / (10) ) ) || '' }
    )
  return messageWithUpdatedContent
}

function calculateLossQ(message /* Object */){
  const rand = rand1to10()
  if (rand < Q_LOSS_CHANCE_){
    console.log('rand came less than 3 in calculateLossQ')
    logStat(`Path died at ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}`)
    return ''
  }
  const messageWithUpdatedContent = 
    Object.assign(
      {},
      message,
      { content: message.content.substring(0, Math.floor( (message.content.length * (rand) ) / (10) ) ) || '' }
    )
  return messageWithUpdatedContent
}

function pushEvent(event /* Event */){
  eventQueue.push(event)
  console.log(logData(`## type: ${event.getEventType()} source: ${event.getAction().source.getId()}, target: ${event.getAction().target.getId()}`))
}

function cycle(){
  console.log(logData(`Cycle ${cycleCounter} done`))
  ++cycleCounter
  setTimeout(() => handleEvent(), 1000 /* miliseconds */)
}

function handleInternal(event){
  event.getAction().source.sendToReceivingQM(event.getAction().target, event.getMessage(), event.getAction().link)
}

function handleExternal(event){
  message = event.getMessage()
  message.source = ''
  event.getAction().link.send(message, event.getAction().source)
}

function handleEvent(){
  var tempQueue = eventQueue
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
  if (tempQueue.length !== 0){
    cycle()
  }
  else{
    console.log(logData(`--------------`))
    logStat(`--------------`)
  }
}

function deadPath(message /* Object */, failurePoing /* Object */){
  const reason = `while doing an ${failurePoing.actionType} event from ${failurePoing.actionType === 'EXTERNAL' ? 'repeater' : 'QM'} ${failurePoing.source.getId()} to ${failurePoing.target.getId()}`
  console.log(logData(`->Path ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')} died ${reason}`))
}

function logData(data){
  fs.appendFile('log.txt', `${data}\n`, 'utf8', (err) => {
    if (err) console.log(err.message)
  })
  return data
}

function logStat(data){
  fs.appendFile('stat.txt', `${data}\n`, 'utf8', (err) => {
    if (err) console.log(err.message)
  })
  return data
}

module.exports = { convertStringToBinary, cycle, generateId, logData, logStat, calculateLossP, calculateLossQ, rand1to10, PSuccessRate, QSuccessRate, deadPath, pushEvent, handleEvent }
