function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

var funqueue = []

function putInQueue( func ){
  this.funqueue.push(func)
}

function doNext(){
  //check for validity
  return this.funcqueue.shift()
}

function doAsynchronouslyWithSomeDelay(operation){
  setTimeout(operation, rand1to10() * 500)
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

module.exports = { rand1to10, doAsynchronouslyWithSomeDelay }
