import { logData } from "./utils.mjs";
import { getEventQueueLength } from "./utils.mjs";

export class Tick{

  constructor(){
    this.tickHistory = []
    this.tickListeners = []
    this.tickListenerHistory = [] // dead listeners go here 
    this.counter = []
    this.terminate = false
    this.TCP_TIMEOUT_TICK_NUM_ = 50
    this.tickFunc = ()=>{}
  }

  /**
   * 
   * @param tickFunc: this param will get its first value when constructing Sender class
   */
  setTickFunc(tickFunc){
    this.tickFunc = tickFunc
  }

  tick(){
    this.tickHistory.push(this.tickFunc)
    logData(`- Doing tick # ${this.tickHistory.length}`)
    this.tickListeners.forEach(
      (listener) =>
        --listener.tickNum === 0 ? this.execTickListener(listener) : ()=>{} // not sure --listener.tickNum or listener.tickNum--
      )
    this.counter.forEach( () => this.tickListeners.pop() )
    this.counter = []
    setTimeout(() => this.tickFunc(), 0)
  }

  

  getTickNums(){
    return this.tickHistory.length
  }

  getTerminate(){
    return this.terminate
  }

  setTerminate(val){
    this.terminate = val
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
    return listener
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