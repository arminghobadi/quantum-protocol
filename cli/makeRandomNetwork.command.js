const parseArgs = require('minimist')

const { makeRandomNetwork } = require('./makeRandomNetwork.function')

const argDefs = `
/**
 * arguments for makeRandomNetwork.command:
 * @arg help -h --help
 * @arg repeater -r Number of repeaters
 */
`

;((args) => {

  const repeater = args['repeater'] || args['r']
  const help = args['help'] || args['h']

  if (help || !repeater)
    return console.log(argDefs)

  makeRandomNetwork({
    repeaters: repeater
  })

})(parseArgs(process.argv.slice(2)))
