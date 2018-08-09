import { generateId } from "./utils.mjs";

export class Window{
  constructor(){
    this.MAX_WINDOW_SIZE_ = 10
    this.windowQueue = []
    this.id = generateId()
    this.currentWindowSize = 0
    this.windowAllowance = 1
    this.windowPeakValue = 0
    this.sender
  }

  /**
   * @returns false -> if MAX_WINDOW_SIZE has reached
   * @returns int -> number of packets its ready to receive
   */
  isReady(){
    return 3
  }

  /**
   * This function will get overriden by Sender class
   */
  readyForNextMessage(){}

  setSender(sender){
    this.sender = sender
  }

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

  /**
   * So, right now my window pulls packages from the sender.
   * I dont know if the window should pull packages from sender, or sender should just push them to the window.
   * ( pushing makes more sense I guess? Im not sure :( )
   */
  // getNextPackage(){
  //   const packagesToSend = this.sender.getNextPackage(0,1)
  //   if (packagesToSend.length > 0){
  //     packagesToSend.forEach(element => {
  //       element.func(element.message)
  //     })
  //   }
  // }

  run(){
    this.currentWindowSize = this.windowAllowance
    this.readyForNextMessage(this.windowAllowance)
  }

  stop() {
    console.log('window Stop')
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