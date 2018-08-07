const fs = require('fs')

const calculateBitRateAndCost = () => {

  const data = fs.readFileSync('./graph.txt', 'utf8', (err) => {
    console.log(err.message)
  })

  const lines = data.split('\n')
  let bitRateSum = 0
  let costSum = 0

  lines.forEach(line => {
    if (line) {
      const values = line.split(' ')
      bitRateSum +=  parseFloat(values[4])
      costSum += parseFloat(values[5])
    }
  })

  console.log(`bitRateAVG = ${bitRateSum/lines.length}\ncostAVG = ${costSum/lines.length}`)

}

module.exports = { calculateBitRateAndCost }
