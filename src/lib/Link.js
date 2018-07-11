const { PSuccessRate, deadPath } = require('./utils')
class Link {
	constructor(end1 /* Repeater */, end2 /* Repeater */, sourceQM /* QuantumMemory */, targetQM /* QuantumMemory */, id /* Integer */){
		this.end1 = end1
		this.end1.addLink(this)
		this.end2 = end2
		this.end2.addLink(this)
		this.sourceQM = sourceQM
		this.targetQM = targetQM
		this.id = id
	}
  send(message /* Object */, source /* Repeater */){
		// TODO: What is this if statement?
		if (message === ''){

		} 
		else {
			if (PSuccessRate()){
				this.otherEnd(source).receive(message, this.getTargetQM(this.otherEnd(source)))
			}
			else {
				deadPath(message, { actionType: 'EXTERNAL', source: source, target: this.otherEnd(source) } )
			}
			
		}
  }
	getId(){
		return this.id
	}
	getSourceQM(repeater){
		if (repeater === this.end1) return this.targetQM
		else if (repeater === this.end2) return this.sourceQM
		else throw new Error('something went wrong in getSourceQM in Link class')
	}
	getTargetQM(repeater){
		if (repeater === this.end1) return this.sourceQM
		else if (repeater === this.end2) return this.targetQM
		else throw new Error('something went wrong in getTargetQM in Link class')
	}
	otherEnd(repeater) {
		if (repeater === this.end1) return this.end2
		else if (repeater === this.end2) return this.end1
		else throw new Error('something went wrong in otherEnd in Link class')
	}
}

module.exports = { Link }
