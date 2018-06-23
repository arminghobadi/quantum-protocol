class QuantumMemory {

	constructor(repeater, id) {
		this.repeater = repeater
		this.id = id
		this.receivedData = false
	}

	getId(){
		return this.id
	}

	doNothing(){}

	send(message, source /* QM */, target /* QM */){
		console.log(`sending a qubit inside repeater ${this.repeater.getId()} from qubit ${source.getId()} to ${target.getId()}`)
		if (message.target !== this.repeater) target.receive(message, source)
			else console.log('i am final target')
	}

	receive(message, source /* QM */){
		console.log(`got a qubit from ${source.getId()}`)
		if (message.target !== this.repeater) this.repeater.emit(message)
    	else console.log('i am final target')
	}

}

module.exports = { QuantumMemory }
