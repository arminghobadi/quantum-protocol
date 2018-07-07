class Event{
  /**
  * Event Types:
  *   INTERNAL -> QuantumMemory to QuantumMemory
  *   EXTERNAL -> Repeater to Repeater
  */

  constructor(eventType, priority, event){
    this.eventType = eventType
    this.priority = priority
    this.event = event
  }

  getEventType(){
    return this.eventType
  }

  getPriority(){
    return this.priority
  }

  getEvent(){
    return this.event
  }


}

module.exports = { Event }
