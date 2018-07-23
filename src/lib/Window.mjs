import { generateId } from "./utils.mjs";

export class Window{
  constructor(){
    this.WINDOW_SIZE_ = 10
    this.windowQueue = []
    this.id = generateId()
  }
  
  addWindowEvent(windowEvent){
    return (this.windowQueue.length === this.WINDOW_SIZE_) ? false : this.windowQueue.push(windowEvent)
  }
  
  run(){
    for (var i = 0 ; i < this.windowQueue.length ; i++){
      if (this.windowQueue[i]()) {
        this.windowQueue.splice(i, 1)
      }
    }
  }
}