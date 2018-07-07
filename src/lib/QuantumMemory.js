const { calculateLossQ, Caro, logData, QSuccessRate, deadPath, pushEvent, generateId } = require('./utils')
const { Event } = require('./Event')
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
		if (message.type === 'String'){
			if (message === ''){

			} else {
				logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`)
				console.log(`message has content '${message.content}'`)
				target.receiveDataFromQM(calculateLossQ(message), linkToSendData)
			}
		}
		if (message.type === 'Bit'){
			if (QSuccessRate()){
				logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`)
				console.log(`message has content '${message.content}'`)
				target.receiveDataFromQM(message, linkToSendData)
			}
			else {
				deadPath(message)
			}
		}

	}

	receiveDataFromQM(message /* Object */, linkToSendData /* Link */){
		logData(`message received. Content: '${message.content}'`)
		console.log(`message received from a qm with content '${message.content}'`)
		//console.log(`++++++++++++${linkToSendData.otherEnd}`)
		pushEvent(new Event('EXTERNAL', { source: this.repeater, target: linkToSendData.otherEnd(this.repeater), link: linkToSendData }, generateId(), message ))

		Caro(() => {

			//linkToSendData.send(message, this.repeater)
		})
	}

}

module.exports = { QuantumMemory }
