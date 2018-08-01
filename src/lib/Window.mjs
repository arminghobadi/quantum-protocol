import { generateId } from "./utils.mjs";

export class Window{
  constructor(){
    this.MAX_WINDOW_SIZE_ = 10
    this.windowQueue = []
    this.id = generateId()
    this.currentWindowSize = 0
    this.windowAllowance = 1
  }

  /**
   * @returns false -> if MAX_WINDOW_SIZE has reached
   * @returns int -> number of packets its ready to receive
   */
  isReady(){
    return 3
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
    this.windowQueue = this.windowQueue.reduce(
      (arrWithoutThing, item) => arrWithoutThing.concat(item.message !== message ? [ item ] : [])
    , [])
    this.windowQueue.find(x => x.message === message)
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
    for (var i = 0 ; i < this.windowQueue.length ; i++){
      if (this.windowQueue[i]()) {
        this.windowQueue.splice(i, 1)
      }
    }
  }
}