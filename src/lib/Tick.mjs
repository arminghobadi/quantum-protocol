
export class Tick{

  constructor(nextTick){
    this.tickHistory = []
    this.nextTick = nextTick
  }

  tick(){
    this.tickHistory.push(this.nextTick)
    this.nextTick()
  }

  setNextTick(tickFunc){
    this.nextTick = tickFunc
  }

  getTickNums(){
    return this.tickHistory.length
  }


}