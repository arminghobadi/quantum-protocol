import fs from 'fs'
import { getRandomNumberWithProbability } from './actions'
import { Tick } from './Tick.mjs';
import { ML } from './ML.mjs';

const P_LOSS_CHANCE_ = 3 // From 1 to 10
const Q_LOSS_CHANCE_ = 3 // From 1 to 10
const P_SUCCESS_RATE_ = 6//6 // 0-> all fail ; 10 -> all success
const Q_SUCCESS_RATE_ = 8//9

const tickRef = new Tick()

export function ticker(){
  return tickRef
}

const mlRef = new ML()

export function ml(){
  return mlRef
}



/**
 * For P = 6 and Q = 9 and a 4x4 grid of a network, usually one path is successfull, resulting around 30 cycles.
 * The receiver usually receives the data around 2 or 3 times. Same thing with the sender.
 * We have to optimize it. Meaning lets figure out for what P and Q and for what grid, there is a minimum number of ACK receiving by the sender
 * ( I dont really know how else to explain what is in my head! I hope this is good enough! )
 */

export function convertStringToBinary(messageContent) {
  let res = ''
  for (var i = 0; i < messageContent.length; i++) {
      res += messageContent[i].charCodeAt(0).toString(2)
  }
  return res
}

export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

export function PSuccessRate(){
  return rand1to10() <= P_SUCCESS_RATE_
}

export function QSuccessRate(){
  return rand1to10() <= Q_SUCCESS_RATE_
}

export function calculateLossP(message /* Object */){
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

export function calculateLossQ(message /* Object */){
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

export function deadPath(message /* Object */, failurePoing /* Object */){
  const reason = `while doing an ${failurePoing.actionType} event from ${failurePoing.actionType === 'EXTERNAL' ? 'repeater' : 'QM'} ${failurePoing.source.getId()} to ${failurePoing.target.getId()}`
  logData(`->Path ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')} died ${reason}`)
}

export function logData(data){
  // fs.appendFile('log.txt', `${data}\n`, 'utf8', (err) => {
  //   if (err) console.log(err.message)
  // })
  //console.log(data)
}

export function logStat(data){
  // fs.appendFile('stat.txt', `${data}\n`, 'utf8', (err) => {
  //   if (err) console.log(err.message)
  // })
  //console.log(data)
}

export function logVis(data){
  // fs.appendFile('vis.txt', `${data}\n`, 'utf8', (err) => {
  //   if (err) console.log(err.message)
  // })
  //console.log(data)
}

export function logGraph(data){
  // fs.appendFileSync('graph.txt', `${data}\n`, 'utf8', (err) => {
  //   if (err) console.log(err.message)
  // })
  //console.log(data)
}