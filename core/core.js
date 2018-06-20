function rand1to10(){
  return Math.floor(Math.random() * 10 + 1)
}

function doAsynchronouslyWithSomeDelay(operation){
  setTimeout(operation, rand1to10() * 500)
}

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

class Link {
	constructor(end1, end2){
		this.end1 = end1;
		this.end1.addLink(this)
		this.end2 = end2;
		this.end2.addLink(this)
	}
  	send(message, source){
    	this.otherEnd(source).receive(message)
  	}
  	otherEnd(repeater) {
		if (repeater === this.end1) return this.end2
		else if (repeater === this.end2) return this.end1
		else throw new Error('???')
  	}
}

const r1 = new Repeater('test1')
const r2 = new Repeater('test2')
const r3 = new Repeater('test3')
const r4 = new Repeater('test4')
const l1 = new Link(r1, r2)
const l2 = new Link(r1, r4)
const l3 = new Link(r2, r4)
const l4 = new Link(r2, r3)
const l5 = new Link(r3, r4)

r1.emit({ target: r3, visited: [], content: 'hello' })
