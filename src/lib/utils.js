const P_LOSS_CHANCE_ = 3 // From 1 to 10
const Q_LOSS_CHANCE_ = 3 // From 1 to 10
const fs = require('fs')

function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
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
    target: message.target,
    visited: message.visited,
    content: message.content.substring(0, Math.floor( (message.content.length * (rand) ) / (10) ) ) || ''
  }
  return messageWithLoss
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

module.exports = { Caro, logData, logStat, calculateLossP, calculateLossQ, rand1to10 }
