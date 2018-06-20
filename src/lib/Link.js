class Link {
	constructor(end1, end2){
		this.end1 = end1;
		this.end1.addLink(this)
		this.end2 = end2;
		this.end2.addLink(this)
	}
  	send(message, source){
    	this.otherEnd(source).receive(message)
  	}
  	otherEnd(repeater) {
		if (repeater === this.end1) return this.end2
		else if (repeater === this.end2) return this.end1
		else throw new Error('???')
  	}
}

module.exports = { Link }
