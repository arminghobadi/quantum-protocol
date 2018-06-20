function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

function doAsynchronouslyWithSomeDelay(operation){
  setTimeout(operation, rand1to10() * 500)
}

module.exports = { rand1to10, doAsynchronouslyWithSomeDelay }
