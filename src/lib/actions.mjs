
/**
 * Usage: give it a start and end Integer and a probability(ex: 70%)
 * it will return a random number that is between the start and end with the probability given
 * @returns Integer
 */ 
export function getRandomNumberWithProbability(start /* Integer between 1 to 10 */, end /* Integer between 1 to 10 */, probability /* Integer between 1 to 10 */){
  var array = []
  const countOfNumbersNotBetweenStartAndEnd = 10 - (end - start + 1)

  const countOfNumbersBetweenStartAndEndThatShouldBeInArray = (probability * countOfNumbersNotBetweenStartAndEnd) / ( 10 - probability)
  const count = Math.floor(countOfNumbersBetweenStartAndEndThatShouldBeInArray)

  for (var i = 1 ; i < start ; i++){
    array.push(i)
  }
  for (var i = 0 ;  i < count ; i++){
    array.push(Math.floor(Math.random() * (end - start + 1)) + start)
  }
  for (var i = end + 1 ; i <= 10 ; i++){
    array.push(i)
  }
  return array[Math.floor(Math.random() * array.length)]
}
