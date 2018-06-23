const { doAsynchronouslyWithSomeDelay, doNext, putInQueue } = require('./utils')
const { QuantumMemory } = require('./QuantumMemory')

class Repeater {
	constructor(name /* String */, numberOfQMs /* Integer */, id /* Integer */) {
		this.id = id
		this.name = name
		this.links = []
		this.QMs = []
		for (var i = 0 ; i < numberOfQMs ; i++){
			this.QMs.push(new QuantumMemory(this, i))
		}
	}
	getId(){
		return this.id
	}
	addLink(link) {
		this.links.push(link)
	}
	getQM(id /* Integer */){
		return this.QMs[id]
	}
	doInrepeaterTransfer(sourceQM, targetQM){
		sourceQM.send(sourceQM, targetQM)
		console.log(`in repeater ${this.getId()} sending a qubit from ${sourceQM.getId()} to ${targetQM.getId()}`)
	}
	emit(message /* Object */, qm) {
		const messageWithUpdatedVisitedList =
			Object.assign(
				{},
				message,
				{ visited: message.visited.concat([this]) }
			)
		this.links
			.filter(link =>
				!message.visited.includes(link.otherEnd(this)))
			.forEach(link =>
				{
					if (message.target !== this) this.doInrepeaterTransfer(qm, link.getTargetQM(this))
					doAsynchronouslyWithSomeDelay(() => {
					link.send(messageWithUpdatedVisitedList, this)
				})
			})

	}
	receive(message /* Object */, qm /* QuantumMemory */) {
		console.log(`${this.name} reveived: ${message.content}
			This repeater has already visited ` + message.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		this.links
			.filter(link =>
				!message.visited.includes(link.otherEnd(this)))
			.forEach(link => {})
		if (message.target !== this) this.emit(message, qm)
	}
}

module.exports = { Repeater }
