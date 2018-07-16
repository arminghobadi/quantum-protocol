const fs = require('fs')

const makeGridNetwork = ({
  width,
  height
}) => {

  fs.writeFile(
    'index.mjs',
    "import { Repeater, Link, getRandomNumberWithProbability, QuantumNetwork } from './lib'\nconst numberOfTimesRunningTheProgram = 1\n\n" ,
    () => {}
  )
  for (var i = 1 ; i <= width*height ; i++){
    fs.appendFile(
      'index.mjs',
      `const r${i} = new Repeater('Repeater${i}', 4, ${i})\n`,
      () => {}
    )
  }
  let j = 1
  let c = 1
  for ( c ; c <= ((width-1)*height)+(height-1) ; c++){
    if (c % width === 0){
      ++c
    }
    fs.appendFile(
      'index.mjs',
      `const l${j} = new Link(r${c}, r${c+1}, r${c}.getQM(2), r${c+1}.getQM(4), ${j++} )\n`,
      () => {}
    )
    
  }

  for ( var i = 1 ; i <= ((height-1)*width) ; i++ ){
    fs.appendFile(
      'index.mjs',
      `const l${j} = new Link(r${i}, r${i+width}, r${i}.getQM(3), r${i+width}.getQM(1), ${j++})\n`,
      () => {}
    )
  }

  // for ( var i = 1 ; i <= width ; i++ ){
  //   fs.appendFile(
  //     'index.mjs',
  //     `const l${i+width+1} = new Link(r${i}, r${i+width}, r${i}.getQM(3), r${i+width}.getQM(1), ${i+width+1})\n`,
  //     () => {}
  //   )
  // }

  const message = `\nconst message = { source: r1, target: r${width*height}, visited: [r1], content: 1, type:'Bit' }`
  let rArray = ''
  for ( var i = 1 ; i <= width*height ; i++ ){
    rArray += `r${i}, `
  }
  rArray = rArray.substring(0, rArray.length-2)

  let lArray = ''
  for ( var i = 1 ; i <= 2*width*height-width-height ; i++ ){
    lArray += `l${i}, `
  }
  lArray = lArray.substring(0, lArray.length-2)

  const network = `for (var i = 0 ; i < numberOfTimesRunningTheProgram ; i++) {(
    new QuantumNetwork(
      { repeaters: [${rArray}], 
        links: [${lArray}]
      },
      message
    )
  ).run()
}`

  fs.appendFile(
    'index.mjs',
    `${message}\n\n${network} `,
    () => {}
  )
}

module.exports = { makeGridNetwork }
