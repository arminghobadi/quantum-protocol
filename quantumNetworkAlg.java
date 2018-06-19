run(){
  sourceRepeater
  sourceQM
  targetRepater
  targetQM

  while(sourceRepeater.getNextLossyLink){
    events.add(new Event(sourceQM, nextQM, eventType))
  }
  

}

send(srouceQM, targetQM){

}
