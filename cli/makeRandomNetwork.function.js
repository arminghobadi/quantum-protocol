const fs = require('fs')

function rand(num){
  return Math.floor(Math.random() * num + 1)
}

function makeLinks(r, links){
  var array = []
  var finalArray = []
  for (var i = 1 ; i < r ; i++){
    for (var j = i+1 ; j <= r ; j++){
      array.push(`r${i} r${j}`)
    }
  }
  for (var i = 1 ; i < links ; i++){
    const ran = rand(array.length)
    finalArray.push(array[ran])
    array.splice(ran, 1)
  }
  console.log(finalArray)
  return finalArray


}

const makeRandomNetwork = ({
  repeaters
}) => {
  var numberOfLinks = Math.floor(Math.random() * ( (repeaters*(repeaters - 1)/2) - repeaters) + repeaters)
  fs.writeFile(
    'index.js',
    "const { Repeater, Link, getRandomNumberWithProbability } = require('./lib')\n" ,
    () => {}
  )
  for (var i = 1 ; i <= repeaters ; i++){
    fs.appendFile(
      'index.js',
      `const r${i} = new Repeater('Repeater${i}', ${repeaters - 1}, ${i})\n`,
      () => {}
    )
  }
  var array = makeLinks(repeaters, numberOfLinks)
  for (var i = 0 ; i < array.length ; i++){
    const split = array[i].split(' ')
    fs.appendFile(
      'index.js',
      `const l${i+1} = new Link(${split[0]}, ${split[1]}, ${split[0]}.getQM(${rand(repeaters - 1)}), ${split[1]}.getQM(${rand(repeaters - 1)}), ${i+1} )\n`,
      () => {}
    )
  }
  var source
  var target
  do {
    source = rand(repeaters)
    target = rand(repeaters)
  } while(source === target)

  fs.appendFile(
    'index.js',
    `r${source}.attemptEntanglement({ source: r${source}, target: r${target}, visited: [], content: 'hello-world!' }, r${source}.getQM(1))\n`,
    () => {}
  )
}


module.exports = { makeRandomNetwork }
