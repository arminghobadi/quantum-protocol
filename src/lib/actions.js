
send(){

}

receive(){

}

emit(){

}

/**
 * Usage: give it a start and end Integer and a probability(ex: 70%)
 * it will return a random number that is between the start and end with the probability given
 * @returns Integer
 */
getRandomNumberWithPossibility(start /* Integer between 1 to 10 */, end /* Integer between 1 to 10 */, probability /* Integer between 1 to 10 */){
  var num = 0
  for (int i = 0 ; i < probability ; i++ ){
    var temp = Math.floor(Math.random() * 10 + 1)
    if (num > start && num < end){
      return num
    }
    if (temp < start){
      num = num > temp ? num : temp
    }
    if (temp > end){
      num = num < temp ? num : temp
    }
  }
  return num
}

module.exports = { getRandomNumberWithPossibility }
