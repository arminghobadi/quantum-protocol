const parseArgs = require('minimist')
//import { calculateBitRateAndCost } from './calculateBitRateAndCost.function'
const { calculateBitRateAndCost } = require('./calculateBitRateAndCost.function')

const argDefs = `
/**
 * arguments for calculateBitRateAndCost.command:
 * @arg help --help
 * @arg width -w Number of repeaters on width
 * @arg height -h Number of repeaters on height
 */
`

;((args) => {

  const help = args['help']

  if (help)
    return console.log(argDefs)

  calculateBitRateAndCost()

})(parseArgs(process.argv.slice(2)))
