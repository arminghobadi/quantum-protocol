const fs = require('fs')

var path123
var path143
var path1243
var path1423

/*
what kind of stat do we want?
success rate of each path

*/
function readFile(){
  fs.readFile('/../src/stat.txt', 'utf8', (err, data) => {
    if (err) console.log(err)
    lineByLineFile(data.split('\n'))
  })
}

function lineByLineFile(lines){

}

function handleRounds(round){

}
