const { generateId, Caro, calculateLossP, logData, logStat, deadPath, PSuccessRate, QSuccessRate, pushEvent, handleEvent } = require('./utils')
const { QuantumMemory } = require('./QuantumMemory')
const { Event } = require('./Event')
//import Event from './Event'

class Repeater {
	//getQM() and list of QMs are never used! should they be there??

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

	getLinks(){
		return this.links
	}

	addLink(link) {
		this.links.push(link)
	}

	getQM(id /* Integer */){
		return this.QMs[id]
	}

	doInrepeaterTransfer(sourceQM /* QuantumMemory */, targetQM /* QuantumMemory */, message /* Object */, linkToSendData /* Link */){
		pushEvent(new Event('INTERNAL', { source: sourceQM, target: targetQM, link: linkToSendData }, generateId(), message ))
		logData(`Sending message '${message.content}' inside repeater ${this.getId()} from QM ${sourceQM.getId() + 1} to QM ${targetQM.getId() + 1}`)
		//sourceQM.sendToReceivingQM(targetQM, message, linkToSendData)
		console.log(`in repeater ${this.getId()} sending a qubit from ${sourceQM.getId()} to ${targetQM.getId()}`)
	}

	attempt(message, sourceQM){
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
					if (message.target !== this && message.source !== this) {
						message.visited = message.visited.concat([this])
						link.send(message, this)
						this.doInrepeaterTransfer(qm, link.getTargetQM(this), messageWithUpdatedVisitedList, link)
					}
					if (message.source === this) {
						//message.source = ''
						message.visited = message.visited.concat([this])
						console.log(message.visited)
						if (PSuccessRate()){
							pushEvent(new Event('EXTERNAL', { source: this, target: link.otherEnd(this), link: link }, generateId(), message ))
							//link.send(message, this)
						}
						else {
							deadPath(message)
						}
					}
			})

		
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

	send(message){
		this.attemptEntanglementForOneBit(message, this.getQM(1)) // get random QM to start
	}

	attemptEntanglementForOneBit(message /* Object */, qm /* QuantumMemory */){
		//console.log(`attemptEntanglementForOneBit`)
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
				{ // TODO: this.getId() !== 1 -> what the fuck!! fix this shit! its embaressing!
					//console.log(`${message.target.getId()}!==${this.getId()}  ${this.getId()}!==1`)
					if (messageWithUpdatedVisitedList.target !== this && messageWithUpdatedVisitedList.source !== this) {
						link.send(messageWithUpdatedVisitedList, this)
						if (link.getTargetQM(this).getRepeater === this){
							this.doInrepeaterTransfer(qm, link.getSourceQM(this), messageWithUpdatedVisitedList, link)
						} else
						this.doInrepeaterTransfer(qm, link.getTargetQM(this), messageWithUpdatedVisitedList, link)
					}
					if (messageWithUpdatedVisitedList.source === this) {
						//message.source = ''
						if (PSuccessRate()){
							pushEvent(new Event('EXTERNAL', { source: this, target: link.otherEnd(this), link: link }, generateId(), messageWithUpdatedVisitedList ))
							//link.send(message, this)
						}
						else {
							deadPath(messageWithUpdatedVisitedList)
						}
					}
			})
	}

	attemptEntanglement(message /* Object */, qm /* QuantumMemory */) {
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
				{ // TODO: this.getId() !== 1 -> what the fuck!! fix this shit! its embaressing!
					if (message.target !== this && this.getId() !== 1) this.doInrepeaterTransfer(qm, link.getTargetQM(this), messageWithUpdatedVisitedList, link)
					if (message.source === this) Caro(() => {
						message.source = ''
						link.send(calculateLossP(messageWithUpdatedVisitedList), this)
				})
			})
	}

	receive(message /* Object */, qm /* QuantumMemory */) {
		const messageWithUpdatedVisitedList =
			Object.assign(
				{},
				message,
				{ visited: message.visited.concat([this]) }
			)
		logData(`${this.name} received: '${messageWithUpdatedVisitedList.content}'
			This repeater has already visited ` + messageWithUpdatedVisitedList.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		console.log(`${this.name} reveived: '${message.content}'
			This repeater has already visited ` + messageWithUpdatedVisitedList.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		if (message.target === this){
			logStat(`----Path: ${messageWithUpdatedVisitedList.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}. Content received: '${message.content}'`)
		}
		else if (message.type === 'Bit'){
			
			this.findLinksToEmitMessage(messageWithUpdatedVisitedList)
				.forEach(link => {
					pushEvent(new Event('INTERNAL', { source: qm, target: link.getTargetQM(this), link: link}, generateId(), messageWithUpdatedVisitedList))
				})
			//this.attemptEntanglementForOneBit(message, qm)
		}
		else {
			this.attemptEntanglement(message, qm)
		}
	}
}

module.exports = { Repeater }
