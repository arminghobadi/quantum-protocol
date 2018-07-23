import { Repeater, Link, getRandomNumberWithProbability, convertStringToBinary, QuantumNetwork } from './lib'
import { Sender } from './lib/Sender.mjs';
import { Window } from './lib/Window.mjs'
import { generateId } from './lib/utils.mjs';
import { Receiver } from './lib/Receiver.mjs';
const numberOfTimesRunningTheProgram = 1

const r1 = new Repeater('Repeater1', 4, 1)
const r2 = new Repeater('Repeater2', 4, 2)
const r3 = new Repeater('Repeater3', 4, 3)
const r4 = new Repeater('Repeater4', 4, 4)
const r5 = new Repeater('Repeater5', 4, 5)
const r6 = new Repeater('Repeater6', 4, 6)
const r7 = new Repeater('Repeater7', 4, 7)
const r8 = new Repeater('Repeater8', 4, 8)
const r9 = new Repeater('Repeater9', 4, 9)
const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(4), 1)
const l2 = new Link(r2, r3, r2.getQM(2), r3.getQM(4), 2)
const l3 = new Link(r4, r5, r4.getQM(2), r5.getQM(4), 3)
const l4 = new Link(r5, r6, r5.getQM(2), r6.getQM(4), 4)
const l5 = new Link(r7, r8, r7.getQM(2), r8.getQM(4), 5)
const l6 = new Link(r8, r9, r8.getQM(2), r9.getQM(4), 6)
const l7 = new Link(r1, r4, r1.getQM(3), r4.getQM(1), 7)
const l8 = new Link(r2, r5, r2.getQM(3), r5.getQM(1), 8)
const l9 = new Link(r3, r6, r3.getQM(3), r6.getQM(1), 9)
const l10 = new Link(r4, r7, r4.getQM(3), r7.getQM(1), 10)
const l11 = new Link(r5, r8, r5.getQM(3), r8.getQM(1), 11)
const l12 = new Link(r6, r9, r6.getQM(3), r9.getQM(1), 12)

// TODO: Should message be called packet? Is it actually a packet? ( it kinda is, but at the same time not exactly)

const stringToBinary = convertStringToBinary("armin")
//console.log(stringToBinary.length)
//const window = new Window()
for (var i = 0 ; i < 1/*stringToBinary.length*/ ; i++) {
	const message = { source: r1, target: r9, visited: [r1], content: stringToBinary.charAt(i), type:'Bit', id: generateId() }
	const qn = new QuantumNetwork({ 
		repeaters: [r1, r2, r3, r4, r5, r6, r7, r8, r9], 
		links: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12]
	})

	new Sender(r1, qn, message, new Receiver(message.target, qn)).send()
	// if (!window.addWindowEvent(new Sender(r1, qn, message).send)){
	// 	setTimeout(() => this, 1000 /* miliseconds */)
	// }
} 