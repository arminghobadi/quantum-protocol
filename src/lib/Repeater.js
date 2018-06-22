const { doAsynchronouslyWithSomeDelay } = require('./utils')
const { QuantumMemory } = require('./QuantumMemory')

class Repeater {
	constructor(name, numberOfQMs) {
		this.name = name
		this.links = []
		this.QMs = []
		for (var i = 0 ; i < numberOfQMs ; i++){
			this.QMs.push(new QuantumMemory(this, i))
		}
	}
	addLink(link) {
		this.links.push(link)
	}
	getQM(id){
		return this.QMs[id]
	}
	emit(message) {
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
				doAsynchronouslyWithSomeDelay(() => link.send(messageWithUpdatedVisitedList, this)))
	}
	receive(message) {
		console.log(`${this.name} reveived: ${message.content} \n This repeater has already visited ${message.visited}`)
		if (message.target !== this) this.emit(message)
    	else console.log('i am final target')
	}
}

module.exports = { Repeater }
