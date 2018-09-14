import { generateId } from "./utils.mjs";

export class Window{
  constructor(){
    this.MAX_WINDOW_SIZE_ = 10
    this.windowQueue = []
    this.id = generateId()
    this.currentWindowSize = 0
    this.windowAllowance = 1
    this.windowPeakValue = 0
  }

  /**
   * This function will get overriden by Sender class
   */
  readyForNextMessage(){}
  
  /**
   * @param windowEvent: A window event is basically a sender.send (function) on one bit, and a message
   * @returns false -> if MAX_WINDOW_SIZE has reached
   * @returns windowEvent -> if MAX_WINDOW_SIZE hasnt reached
   */
  addWindowEvent(windowEvent){
    return (this.windowQueue.length === this.MAX_WINDOW_SIZE_) ? false : this.windowQueue.push(windowEvent)
  }
  removeWindowEvent(message){
    // I can use this.windowQueue.filter instead of reduce, but lets keep it like this as an example of reduce
    this.windowQueue = this.windowQueue.reduce(
      (arrWithoutThing, item) => arrWithoutThing.concat(item.message !== message ? [ item ] : [])
    , [])
  }

  run(){
    this.currentWindowSize = this.windowAllowance
    this.readyForNextMessage(this.windowAllowance)
  }

  stop() {
    console.log('window Stopped')
  }

  messageDelivered() {
    if (this.windowAllowance*2 >= this.MAX_WINDOW_SIZE_){
      this.windowAllowance = this.MAX_WINDOW_SIZE_
    }
    else{
      if (this.windowPeakValue === 0){
        if (this.windowAllowance !== this.MAX_WINDOW_SIZE_) this.windowAllowance*=2
      }
      else {
        if (this.windowAllowance < this.windowPeakValue) this.windowAllowance*=2
        else this.windowAllowance++
      }
    }
    this.readyForNextMessage(this.windowAllowance)
  }

  messageLost() {
    if (this.windowPeakValue === 0){
      return
    }
    this.windowPeakValue = this.windowAllowance
    this.windowAllowance = this.windowPeakValue/2
  }
}