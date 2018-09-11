
export class Tick{

  constructor(){
    this.tickHistory = []
    this.tickListeners = []
    this.tickListenerHistory = [] // dead listeners go here 
    this.counter = []
    this.TCP_TIMEOUT_TICK_NUM_ = 50
  }

  tick(tickFunc){
    this.tickHistory.push(tickFunc)
    console.log(`doing tick # ${this.tickHistory.length}`)
    tickFunc()
    this.tickListeners.forEach(
      (listener) =>
        --listener.tickNum === 0 ? this.execTickListener(listener) : ()=>{} // not sure --listener.tickNum or listener.tickNum--
      )
    this.counter.forEach( () => this.tickListeners.pop() )
    this.counter = []
  }

  getTickNums(){
    return this.tickHistory.length
  }

  getTcpTimeoutTickNum(){
    return this.TCP_TIMEOUT_TICK_NUM_
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

  removeTickListener(listener){
    return this.tickListeners.splice(this.tickListeners.indexOf(listener), 1)
  }

}