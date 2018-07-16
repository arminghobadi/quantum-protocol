const parseArgs = require('minimist')
//import { makeGridNetwork } from './makeGridNetwork.function'
const { makeGridNetwork } = require('./makeGridNetwork.function')

const argDefs = `
/**
 * arguments for makeGridNetwork.command:
 * @arg help --help
 * @arg width -w Number of repeaters on width
 * @arg height -h Number of repeaters on height
 */
`

;((args) => {

  const width = args['width'] || args['w']
  const height = args['height'] || args['h']
  const help = args['help']

  if (help || !width || !height)
    return console.log(argDefs)

  makeGridNetwork({
    width: width,
    height: height
  })

})(parseArgs(process.argv.slice(2)))
