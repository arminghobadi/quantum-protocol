class QuantumMemory {

	constructor(repeater /* Repeater */, id /* Integer */) {
		this.repeater = repeater
		this.id = id
	}

	getId(){
		return this.id
	}

	send(source /* QuantumMemory */, target /* QuantumMemory */){
		target.receive(source, target)
	}

	receive(source /* QuantumMemory */, target /* QuantumMemory */){
		console.log("got it")
	}

}

module.exports = { QuantumMemory }
