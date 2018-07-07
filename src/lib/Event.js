class Event{
  /**
  * Event Types:
  *   INTERNAL -> QuantumMemory to QuantumMemory
  *   EXTERNAL -> Repeater to Repeater
  */

  constructor(
    eventType /* String: INTERNAL, EXTERNAL*/,
    event /* Object: the actual event to be handeled*/,
    id /* String */,
    message /* Object */
  ){
    this.eventType = eventType
    this.event = event
    this.id = id
    this.message = message
  }

  getEventType(){
    return this.eventType
  }

  getEvent(){
    return this.event
  }

  getId(){
    return this.id
  }

  getMessage(){
    return this.message
  }

}

module.exports = { Event }
