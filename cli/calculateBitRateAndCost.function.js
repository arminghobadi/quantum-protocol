const fs = require('fs')

const calculateBitRateAndCost = () => {

  const data = fs.readFileSync('./graph.txt', 'utf8', (err) => {
    console.log(err.message)
  })

  const lines = data.split('\n')
  let bitRateSum = 0
  let costSum = 0
  let pathlength = 0
  let count = 0

  lines.forEach(line => {
    if (line) {
      const values = line.split(' ')
      bitRateSum +=  parseFloat(values[4])
      costSum += parseFloat(values[5])
      //console.log(parseFloat(values[0]))
      if (parseFloat(values[0]) > 0){
        count++
        //console.log(parseFloat(values[0]))
        pathlength += parseFloat(values[0])
      }
    }
  })

  console.log(`bitRateAVG = ${bitRateSum/lines.length}\ncostAVG = ${costSum/lines.length}\npathlength = ${pathlength/count}`)

}

module.exports = { calculateBitRateAndCost }
