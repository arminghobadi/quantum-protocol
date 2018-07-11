const { generateId, calculateLossP, logData, logStat, deadPath, PSuccessRate, pushEvent } = require('./utils')
const { QuantumMemory } = require('./QuantumMemory')
const { Event } = require('./Event')

class Repeater {
	//getQM() and list of QMs are never used! Should they be there??

	constructor(name /* String */, numberOfQMs /* Integer */, id /* Integer */) {
		this.id = id
		this.name = name
		this.links = []
		this.QMs = []
		for (var i = 1 ; i <= numberOfQMs ; i++){
			this.QMs.push(new QuantumMemory(this, i))
		}
	}

	getId(){
		return this.id
	}

	getLinks(){
		return this.links
	}

	addLink(link) {
		this.links.push(link)
	}

	getQM(id /* Integer */){
		return this.QMs[id-1]
	}

	findLinksToEmitMessage( message ){
		var links = []
		this.links
			.filter(link =>
				!message.visited.includes(link.otherEnd(this)))
			.forEach(link =>
				{
					links.push(link)
			})
		return links
	}

	receive(message /* Object */, qm /* QuantumMemory */) {
		const messageWithUpdatedVisitedList =
			Object.assign(
				{},
				message,
				{ visited: message.visited.concat([this]) }
			)
		
		console.log(logData(`${this.name} received: '${messageWithUpdatedVisitedList.content}'
			This repeater has already visited ` + messageWithUpdatedVisitedList.visited.reduce((output, repeater) => output + repeater.name + ' ', '')))
		
		if (messageWithUpdatedVisitedList.target === this) {
			logStat(`Path: ${messageWithUpdatedVisitedList.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}. Content received: '${message.content}'`)
		}
		else {
			this.findLinksToEmitMessage(messageWithUpdatedVisitedList)
			.forEach(link => {
				switch (messageWithUpdatedVisitedList.type){
					case 'String':
						pushEvent(new Event('INTERNAL', { source: qm, target: link.getTargetQM(this), link: link}, generateId(), calculateLossP(messageWithUpdatedVisitedList)))
						break
					case 'Bit':
						pushEvent(new Event('INTERNAL', { source: qm, target: link.getTargetQM(this), link: link}, generateId(), messageWithUpdatedVisitedList))
						break
					default:
						break
				}
			})
		}
	}
}

module.exports = { Repeater }
