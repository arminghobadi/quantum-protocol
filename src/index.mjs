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
const r10 = new Repeater('Repeater10', 4, 10)
const r11 = new Repeater('Repeater11', 4, 11)
const r12 = new Repeater('Repeater12', 4, 12)
const r13 = new Repeater('Repeater13', 4, 13)
const r14 = new Repeater('Repeater14', 4, 14)
const r15 = new Repeater('Repeater15', 4, 15)
const r16 = new Repeater('Repeater16', 4, 16)
const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(4), 1)
const l2 = new Link(r2, r3, r2.getQM(2), r3.getQM(4), 2)
const l3 = new Link(r3, r4, r3.getQM(2), r4.getQM(4), 3)
const l4 = new Link(r5, r6, r5.getQM(2), r6.getQM(4), 4)
const l5 = new Link(r6, r7, r6.getQM(2), r7.getQM(4), 5)
const l6 = new Link(r7, r8, r7.getQM(2), r8.getQM(4), 6)
const l7 = new Link(r9, r10, r9.getQM(2), r10.getQM(4), 7)
const l8 = new Link(r10, r11, r10.getQM(2), r11.getQM(4), 8)
const l9 = new Link(r11, r12, r11.getQM(2), r12.getQM(4), 9)
const l10 = new Link(r13, r14, r13.getQM(2), r14.getQM(4), 10)
const l11 = new Link(r14, r15, r14.getQM(2), r15.getQM(4), 11)
const l12 = new Link(r15, r16, r15.getQM(2), r16.getQM(4), 12)
const l13 = new Link(r1, r5, r1.getQM(3), r5.getQM(1), 13)
const l16 = new Link(r4, r8, r4.getQM(3), r8.getQM(1), 16)
const l14 = new Link(r2, r6, r2.getQM(3), r6.getQM(1), 14)
const l15 = new Link(r3, r7, r3.getQM(3), r7.getQM(1), 15)
const l17 = new Link(r5, r9, r5.getQM(3), r9.getQM(1), 17)
const l18 = new Link(r6, r10, r6.getQM(3), r10.getQM(1), 18)
const l19 = new Link(r7, r11, r7.getQM(3), r11.getQM(1), 19)
const l20 = new Link(r8, r12, r8.getQM(3), r12.getQM(1), 20)
const l21 = new Link(r9, r13, r9.getQM(3), r13.getQM(1), 21)
const l22 = new Link(r10, r14, r10.getQM(3), r14.getQM(1), 22)
const l23 = new Link(r11, r15, r11.getQM(3), r15.getQM(1), 23)
const l24 = new Link(r12, r16, r12.getQM(3), r16.getQM(1), 24)

// TODO: Should message be called packet? Is it actually a packet? ( it kinda is, but at the same time not exactly)
// TODO: BUG: So, I found this problem that this algorithm will even go through the paths that cant even reach the target! :(

const stringToBinary = convertStringToBinary("armin")
//console.log(stringToBinary.length)
//const window = new Window()
for (var i = 0 ; i < 1/*stringToBinary.length*/ ; i++) {
	const message = { source: r10, target: r4, visited: [r10], content: 1, type:'Bit', id: generateId() }
	

	const qn = new QuantumNetwork({ 
		repeaters: [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16], 
		links: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24],

	})
	const receiver = new Receiver(message.target, qn)
	message.target.setReceiver(receiver)

	new Sender({sender: message.source, network: qn, message, receiver: message.target}).send(message) // send(message)?? get rid of this shit dude! 
	// if (!window.addWindowEvent(new Sender(r1, qn, message).send)){
	// 	setTimeout(() => this, 1000 /* miliseconds */)
	// }
} 