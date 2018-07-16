import { Repeater, Link, convertStringToBinary, QuantumNetwork } from './lib'
const numberOfTimesRunningTheProgram = 1

const r1 = new Repeater('Repeater1', 4, 1)
const r2 = new Repeater('Repeater2', 4, 2)
const r3 = new Repeater('Repeater3', 4, 3)
const r4 = new Repeater('Repeater4', 4, 4)
const r5 = new Repeater('Repeater5', 4, 5)
const r6 = new Repeater('Repeater6', 4, 6)

const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(4), 1)
const l2 = new Link(r2, r3, r2.getQM(2), r3.getQM(4), 2)
const l3 = new Link(r4, r5, r4.getQM(2), r5.getQM(4), 3)
const l4 = new Link(r5, r6, r5.getQM(2), r6.getQM(4), 4)
const l5 = new Link(r1, r4, r1.getQM(3), r4.getQM(1), 5)
const l6 = new Link(r2, r5, r2.getQM(3), r5.getQM(1), 6)
const l7 = new Link(r3, r6, r3.getQM(3), r6.getQM(1), 7)

const message = { source: r1, target: r6, visited: [r1], content: 1, type: 'Bit' }

for (var i = 0 ; i < numberOfTimesRunningTheProgram ; i++) {(
    new QuantumNetwork(
      { repeaters: [r1, r2, r3, r4, r5, r6], 
        links: [l1, l2, l3, l4, l5, l6, l7]
      },
      message
    )
  ).run()
}


// const r1 = new Repeater('Repeater1', 3, 1)
// const r2 = new Repeater('Repeater2', 4, 2)
// const r3 = new Repeater('Repeater3', 5, 3)
// const r4 = new Repeater('Repeater4', 3, 4)
// const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(1), 1)
// const l2 = new Link(r2, r4, r2.getQM(3), r4.getQM(2), 2)
// const l3 = new Link(r4, r3, r4.getQM(3), r3.getQM(3), 3)
// const l4 = new Link(r2, r3, r2.getQM(4), r3.getQM(2), 4)
// const l5 = new Link(r1, r4, r1.getQM(3), r4.getQM(1), 5)

// const message = { source: r1, target: r3, visited: [r1], content: 1, type: 'Bit' }

// for (var i = 0 ; i < numberOfTimesRunningTheProgram ; i++) {(
//     new QuantumNetwork(
//       { repeaters: [r1, r2, r3, r4], 
//         links: [l1, l2, l3, l4, l5]
//       },
//       message
//     )
//   ).run()
// }
//console.log(convertStringToBinary(`armin`))
