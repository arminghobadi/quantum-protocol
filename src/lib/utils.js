const P_LOSS_CHANCE_ = 1 // From 1 to 10
const Q_LOSS_CHANCE_ = 1 // From 1 to 10

function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

function calculateLossP(message /* String */){
  const rand = rand1to10()
  if (rand < P_LOSS_CHANCE_){
    return ''
  }
  const loss = Math.floor( (message.length * (10 - rand) ) / 10 )
  return message.substring(0, loss)
}

function calculateLossQ(message /* String */){
  const rand = rand1to10()
  if (rand < Q_LOSS_CHANCE_){
    return ''
  }
  const loss = Math.floor(message.length / rand)
  return message.substring(0, loss)
}

function doAsynchronouslyWithSomeDelay(operation){
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

module.exports = { rand1to10, doAsynchronouslyWithSomeDelay, calculateLossP, calculateLossQ }
