const { doAsynchronouslyWithSomeDelay } = require('./utils')
const { QuantumMemory } = require('./QuantumMemory')

class Repeater {
	constructor(name, numberOfQMs, id) {
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
	getQM(id){
		return this.QMs[id]
	}
	doInrepeaterTransfer(sourceQM, targetQM){

	}
	findLinkToSend(message){
		return this.links
			.filter(link =>
				!message.visited.includes(link.otherEnd(this)))
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
				doAsynchronouslyWithSomeDelay(() => {
					link.send(messageWithUpdatedVisitedList, this)
				}))
	}
	receive(message, qm) {
		console.log(`${this.name} reveived: ${message.content}
			This repeater has already visited ` + message.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		var links = this.findLinkToSend(message)
		links.forEach(link => doAsynchronouslyWithSomeDelay( () => {
			qm.send(message, qm, link.getTargetQM(this))
		} ))
	}
}

module.exports = { Repeater }
