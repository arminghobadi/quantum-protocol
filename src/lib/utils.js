const P_LOSS_CHANCE_ = 3 // From 1 to 10
const Q_LOSS_CHANCE_ = 3 // From 1 to 10
const P_SUCCESS_RATE_ = 5
const Q_SUCCESS_RATE_ = 5
const fs = require('fs')
const getRandomNumberWithProbability = require('./actions')

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

module.exports = { Caro, logData, logStat, calculateLossP, calculateLossQ, rand1to10, PSuccessRate, QSuccessRate, deadPath }
