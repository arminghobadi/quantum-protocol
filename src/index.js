const { Repeater, Link } = require('./lib')

const r1 = new Repeater('Repeater1')
const r2 = new Repeater('Repeater2')
const r3 = new Repeater('Repeater3')
const r4 = new Repeater('Repeater4')
const l1 = new Link(r1, r2)
const l2 = new Link(r1, r4)
const l3 = new Link(r2, r4)
const l4 = new Link(r2, r3)
const l5 = new Link(r3, r4)

r1.emit({ target: r3, visited: [], content: 'hello' })
