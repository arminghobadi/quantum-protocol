const { doAsynchronouslyWithSomeDelay } = require('./utils')

class Repeater {
	constructor(name) {
		this.name = name
		this.links = [];
	}
	addLink(link) {
		this.links.push(link)
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
		console.log(this.name + ' received: ' + message.content)
		if (message.target !== this) this.emit(message)
    	else console.log('i am final target')
	}
}

module.exports = { Repeater }
