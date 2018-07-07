const { Caro, calculateLossP, logData, logStat, deadPath, PSuccessRate, QSuccessRate } = require('./utils')
const { QuantumMemory } = require('./QuantumMemory')

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

	addLink(link) {
		this.links.push(link)
	}

	getQM(id /* Integer */){
		return this.QMs[id]
	}

	doInrepeaterTransfer(sourceQM /* QuantumMemory */, targetQM /* QuantumMemory */, message /* Object */, linkToSendData /* Link */){
		logData(`Sending message '${message.content}' inside repeater ${this.getId()} from QM ${sourceQM.getId() + 1} to QM ${targetQM.getId() + 1}`)
		sourceQM.sendToReceivingQM(targetQM, message, linkToSendData)
		console.log(`in repeater ${this.getId()} sending a qubit from ${sourceQM.getId()} to ${targetQM.getId()}`)
	}



	attemptEntanglementForOneBit(message /* Object */, qm /* QuantumMemory */){
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
						if (PSuccessRate()){
							link.send(message, this)
						}
						else {
							deadPath(message)
						}

				})
			})
	}

	attemptEntanglement(message /* Object */, qm /* QuantumMemory */) {

		//what does this do exactly?
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
		logData(`${this.name} received: '${message.content}'
			This repeater has already visited ` + message.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		console.log(`${this.name} reveived: '${message.content}'
			This repeater has already visited ` + message.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		if (message.target === this){
			logStat(`Path: ${message.visited.reduce((output, repeater) => output + repeater.name + ' ', '')}. Content received: '${message.content}'`)
		}
		else if (message.type === 'Bit'){
			this.attemptEntanglementForOneBit(message, qm)
		}
		else {
			this.attemptEntanglement(message, qm)
		}
	}
}

module.exports = { Repeater }
