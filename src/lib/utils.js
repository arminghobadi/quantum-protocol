const P_LOSS_CHANCE_ = 3 // From 1 to 10
const Q_LOSS_CHANCE_ = 1 // From 1 to 10

export function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

export function calculateLossP(message /* Object */){
  const rand = rand1to10()
  if (rand < P_LOSS_CHANCE_){
    console.log('rand came less than 3')
    // TODO: this is where the path should die!! it just throws an error right now which i think is good enough!
    // im not sure actually. should i do something else?!
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

export function calculateLossQ(message /* Object */){
  const rand = rand1to10()
  if (rand < Q_LOSS_CHANCE_){
    console.log('rand came less than 3')
    // TODO: this is where the path should die!! it just throws an error right now which i think is good enough!
    // im not sure actually. should i do something else?!
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

export function doAsynchronouslyWithSomeDelay(operation){
  setTimeout(operation, rand1to10() * 500 /* miliseconds */)
}

/*
// Create your functions, in a variety of manners...
// (The second method is preferable, but I show the first for reference.)
function fun1() { alert("Message 1"); };
var fun2 = function() { alert("Message 2"); };

// Create an array and append your functions to them
var funqueue = [];
funqueue.push(fun1);
funqueue.push(fun2);

// Remove and execute the first function on the queue
(funqueue.shift())();
*/

//module.exports = { rand1to10, doAsynchronouslyWithSomeDelay, calculateLossP, calculateLossQ }
