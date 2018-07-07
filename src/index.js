const { Repeater, Link, getRandomNumberWithProbability, attemptEntanglementForOneBit, cycle } = require('./lib')

const r1 = new Repeater('Repeater1', 3, 1)
const r2 = new Repeater('Repeater2', 4, 2)
const r3 = new Repeater('Repeater3', 5, 3)
const r4 = new Repeater('Repeater4', 3, 4)
const l1 = new Link(r1, r2, r1.getQM(1), r2.getQM(0), 1)
const l2 = new Link(r2, r4, r2.getQM(2), r4.getQM(1), 2)
const l3 = new Link(r4, r3, r4.getQM(2), r3.getQM(2), 3)
const l4 = new Link(r2, r3, r2.getQM(3), r3.getQM(1), 4)
const l5 = new Link(r1, r4, r1.getQM(2), r4.getQM(0), 5)

//r1.attemptEntanglement({ source: r1, target: r3, visited: [], content: 'hello-world!', type: 'String' }, r1.getQM(1))
r1.attemptEntanglementForOneBit({ source: r1, target: r3, visited: [], content: 1, type: 'Bit' }, r1.getQM(1))
cycle()

// maybe have a class called "Network" that mimics the whole network and does all the qubit transfers
