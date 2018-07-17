const fs = require('fs')

/**
 * Given Width = 3 and Height = 3, it will generate the following network:
 * 
 * R1------L1------R2------L2------R3
 * |               |               |
 * |               |               |
 * L7              L8              L9
 * |               |               |
 * |               |               |
 * R4------L3------R5------L4------R6
 * |               |               |
 * |               |               |
 * L10             L11             L12
 * |               |               |
 * |               |               |
 * R7------L5------R8------L6------R9
 */

function appendToIndex(data){
  fs.appendFile(
    'index.mjs',
    data,
    () => {}
  )
}

function createIndex(){
  return new Promise((resolve, reject) => {
    fs.writeFile(
      'index.mjs',
      "import { Repeater, Link, getRandomNumberWithProbability, QuantumNetwork } from './lib'\nconst numberOfTimesRunningTheProgram = 1\n\n" ,
      (err) => { if (err) reject(err); resolve()}
    )
  })
}

const makeGridNetwork = ({
  width,
  height
}) => {

  let linkId = 1

  // Making index.mjs with the imports
  createIndex().then(
    () => {
      for (var i = 1 ; i <= width*height ; i++){
        appendToIndex(`const r${i} = new Repeater('Repeater${i}', 4, ${i})\n`)
      }
      
      // Creating horizontal links
      for ( var c = 1 ; c <= ((width-1)*height)+(height-1) ; c++){
        if (c % width === 0)
          ++c
        appendToIndex(`const l${linkId} = new Link(r${c}, r${c+1}, r${c}.getQM(2), r${c+1}.getQM(4), ${linkId++})\n`)
      }
    
      // Creating vertical links
      for ( var i = 1 ; i <= ((height-1)*width) ; i++ ){
        appendToIndex(`const l${linkId} = new Link(r${i}, r${i+width}, r${i}.getQM(3), r${i+width}.getQM(1), ${linkId++})\n`)
      }
    
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
    
      const network = `for (var i = 0 ; i < numberOfTimesRunningTheProgram ; i++) {(\n\t\tnew QuantumNetwork(\n\t\t\t{ \n\t\t\t\trepeaters: [${rArray}], \n\t\t\t\tlinks: [${lArray}]\n\t\t\t},\n\t\t\tmessage\n\t\t)\n\t).run()\n}`
      appendToIndex(`${message}\n\n${network} `)
    }
  )

  // Creating Repeaters
  
}

module.exports = { makeGridNetwork }
