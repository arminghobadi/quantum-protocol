const { Repeater, Link, cycle, pushEvent, Event, generateId, convertStringToBinary } = require('./lib')

const r1 = new Repeater('Repeater1', 3, 1)
const r2 = new Repeater('Repeater2', 4, 2)
const r3 = new Repeater('Repeater3', 5, 3)
const r4 = new Repeater('Repeater4', 3, 4)
const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(1), 1)
const l2 = new Link(r2, r4, r2.getQM(3), r4.getQM(2), 2)
const l3 = new Link(r4, r3, r4.getQM(3), r3.getQM(3), 3)
const l4 = new Link(r2, r3, r2.getQM(4), r3.getQM(2), 4)
const l5 = new Link(r1, r4, r1.getQM(3), r4.getQM(1), 5)

const message = { source: r1, target: r3, visited: [r1], content: 1, type: 'Bit' }
console.log(convertStringToBinary(`armin`))
r1.findLinksToEmitMessage(message)
  .forEach(link => {
    pushEvent(new Event('EXTERNAL', {source: r1, target: link.otherEnd(r1), link: link}, generateId(), message))
  })
cycle()

// maybe have a class called "Network" that mimics the whole network and does all the qubit transfers
