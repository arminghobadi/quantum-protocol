export class Event{
  /**
  * Event Types:
  *   INTERNAL -> QuantumMemory to QuantumMemory
  *   EXTERNAL -> Repeater to Repeater
  */

  constructor(
    eventType /* String: INTERNAL, EXTERNAL*/,
    action /* Object: the actual event to be handeled*/,
    id /* String */,
    message /* Object */
  ){
    this.eventType = eventType
    this.action = action
    this.id = id
    this.message = message
  }

  getEventType(){
    return this.eventType
  }

  getAction(){
    return this.action
  }

  getId(){
    return this.id
  }

  getMessage(){
    return this.message
  }

}
