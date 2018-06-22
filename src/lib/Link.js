class Link {
	constructor(end1, end2, sourceQM, targetQM, id){
		this.end1 = end1
		this.end1.addLink(this)
		this.end2 = end2
		this.end2.addLink(this)
		this.sourceQM = sourceQM
		this.targetQM = targetQM
		this.id = id
	}
  send(message, source /* Repeater*/){
		//source.getQM(sourceQM).send(message)
  	this.otherEnd(source).receive(message, this.getTargetQM(this.otherEnd(source)))
  }
	getSourceQM(repeater){
		if (repeater === this.end1) return this.targetQM
		else if (repeater === this.end2) return this.sourceQM
		else throw new Error('something')
	}
	getTargetQM(repeater){
		if (repeater === this.end1) return this.sourceQM
		else if (repeater === this.end2) return this.targetQM
		else throw new Error('something')
	}
	otherEnd(repeater) {
		if (repeater === this.end1) return this.end2
		else if (repeater === this.end2) return this.end1
		else throw new Error('???')
	}
}

module.exports = { Link }
