import { calculateLossQ, doAsynchronouslyWithSomeDelay } from './utils'
export class QuantumMemory {

	constructor(repeater /* Repeater */, id /* Integer */) {
		this.repeater = repeater
		this.id = id
	}

	getId(){
		return this.id
	}

	sendToReceivingQM(target /* QuantumMemory */, message /* Object */, linkToSendData /* Link */){
		console.log(`message has content ${message.content}`)
		target.receiveDataFromQM(calculateLossQ(message), linkToSendData)
	}

	receiveDataFromQM(message /* Object */, linkToSendData /* Link */){
		console.log(`message received from a qm with content ${message.content}`)
		doAsynchronouslyWithSomeDelay(() => {
			linkToSendData.send(message, this.repeater)
		})
	}

}
