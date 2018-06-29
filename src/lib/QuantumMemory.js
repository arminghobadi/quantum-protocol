const { calculateLossQ, Caro, logData } = require('./utils')
const fs = require('fs')
class QuantumMemory {

	constructor(repeater /* Repeater */, id /* Integer */) {
		this.repeater = repeater
		this.id = id
	}

	getId(){
		return this.id
	}

	sendToReceivingQM(target /* QuantumMemory */, message /* Object */, linkToSendData /* Link */){
		logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`)
		console.log(`message has content '${message.content}'`)
		target.receiveDataFromQM(calculateLossQ(message), linkToSendData)
	}

	receiveDataFromQM(message /* Object */, linkToSendData /* Link */){
		logData(`message received. Content: '${message.content}'`)
		console.log(`message received from a qm with content '${message.content}'`)
		Caro(() => {
			linkToSendData.send(message, this.repeater)
		})
	}

}

module.exports = { QuantumMemory }
