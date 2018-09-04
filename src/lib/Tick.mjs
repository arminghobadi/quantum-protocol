
export class Tick{

  constructor(nextTick){
    this.tickHistory = []
    this.nextTick = nextTick
    this.tickListeners = []
    this.tickListenerHistory = [] // dead listeners go here 
    this.counter = []
  }

  tick(){
    this.tickHistory.push(this.nextTick)
    this.nextTick()
    this.tickListeners.forEach(
      (listener) =>
        --listener.tickNum === 0 ? this.execTickListener(listener) : ()=>{} // not sure --listener.tickNum or listener.tickNum--
      )
    this.counter.forEach( () => this.tickListeners.pop() )
    this.counter = []
  }

  setNextTick(tickFunc){
    this.nextTick = tickFunc
  }

  getTickNums(){
    return this.tickHistory.length
  }

  /**
   * tickListener: { tickNum: number of ticks to wait till execution, fun: function to execute after that many ticks, id }
   */
  setTickListener(listener){
    this.tickListeners.push(listener)
    this.tickListeners.sort((el, nextEl) => nextEl.tickNum - el.tickNum)
  }

  execTickListener(listener){
    this.counter.push('')
    this.tickListenerHistory.push(listener)
    listener.fun()
  }

}