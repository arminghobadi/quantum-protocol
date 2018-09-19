import { Repeater, Link, getRandomNumberWithProbability, convertStringToBinary, QuantumNetwork } from './lib'
import { Sender } from './lib/Sender.mjs';
import { Window } from './lib/Window.mjs'
import { generateId } from './lib/utils.mjs';
import { Receiver } from './lib/Receiver.mjs';
import React from 'react'
import ReactDOM from 'react-dom'

//import { combineReducers, createStore, compose } from 'redux'
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import { App } from './App'
const numberOfTimesRunningTheProgram = 1


//Random Graph 1 -> 16:3-6,6-13,7-9,10-12,9-11,2-11,4-10,5-14,10-14,11-15,8-12,5-10,7-12,10-13,2-8,9-13,5-13,1-2,0-10,10-11,5-6,1-6,3-7,1-15,7-10,4-11,2-7,4-14


//Random Graph 2:
// const r1 = new Repeater('Repeater1', 4, 1)
// const r2 = new Repeater('Repeater2', 4, 2)
// const r3 = new Repeater('Repeater3', 4, 3)
// const r4 = new Repeater('Repeater4', 4, 4)
// const r5 = new Repeater('Repeater5', 4, 5)
// const r6 = new Repeater('Repeater6', 4, 6)
// const r7 = new Repeater('Repeater7', 4, 7)
// const r8 = new Repeater('Repeater8', 4, 8)
// const r9 = new Repeater('Repeater9', 4, 9)
// const r10 = new Repeater('Repeater10', 4, 10)
// const r11 = new Repeater('Repeater11', 4, 11)
// const r12 = new Repeater('Repeater12', 4, 12)
// const r13 = new Repeater('Repeater13', 4, 13)
// const r14 = new Repeater('Repeater14', 4, 14)
// const r15 = new Repeater('Repeater15', 4, 15)
// const r16 = new Repeater('Repeater16', 4, 16)
// const l1 = new Link(r1, r2, r1.getQM(1), r2.getQM(4), 1)
// const l2 = new Link(r2, r3, r2.getQM(1), r3.getQM(4), 2)
// const l3 = new Link(r1, r6, r1.getQM(3), r6.getQM(1), 3)
// const l4 = new Link(r1, r7, r1.getQM(2), r7.getQM(1), 4)
// const l5 = new Link(r2, r8, r2.getQM(3), r8.getQM(1), 5)
// const l6 = new Link(r2, r4, r2.getQM(2), r4.getQM(4), 6)
// const l7 = new Link(r3, r4, r3.getQM(3), r4.getQM(1), 7)
// const l8 = new Link(r3, r5, r3.getQM(2), r5.getQM(1), 8)
// const l9 = new Link(r6, r7, r6.getQM(2), r7.getQM(4), 9)
// const l10 = new Link(r7, r8, r7.getQM(2), r8.getQM(4), 10)
// const l11 = new Link(r8, r9, r8.getQM(2), r9.getQM(4), 11)
// const l12 = new Link(r4, r9, r4.getQM(3), r9.getQM(1), 12)
// const l13 = new Link(r4, r5, r4.getQM(2), r5.getQM(4), 13)
// const l14 = new Link(r6, r10, r6.getQM(3), r10.getQM(1), 14)
// const l15 = new Link(r7, r14, r7.getQM(3), r14.getQM(1), 15)
// const l16 = new Link(r8, r11, r8.getQM(3), r11.getQM(1), 16)
// const l17 = new Link(r9, r12, r9.getQM(3), r12.getQM(1), 17)
// const l18 = new Link(r9, r16, r9.getQM(2), r16.getQM(2), 18)
// const l19 = new Link(r5, r16, r5.getQM(3), r16.getQM(1), 19)
// const l20 = new Link(r10, r13, r10.getQM(3), r13.getQM(1), 20)
// const l21 = new Link(r10, r14, r10.getQM(2), r14.getQM(4), 21)
// const l22 = new Link(r11, r12, r11.getQM(2), r12.getQM(4), 22)
// const l23 = new Link(r11, r15, r11.getQM(3), r15.getQM(3), 23)
// const l24 = new Link(r12, r15, r12.getQM(3), r15.getQM(1), 24)
// const l25 = new Link(r12, r16, r12.getQM(2), r16.getQM(3), 25)
// const l26 = new Link(r13, r14, r13.getQM(2), r14.getQM(3), 26)
// const l27 = new Link(r14, r15, r14.getQM(2), r15.getQM(4), 27)
// const l28 = new Link(r15, r16, r15.getQM(2), r16.getQM(4), 28)


//Diamond Graph: 
// const r1 = new Repeater('Repeater1', 4, 1)
// const r2 = new Repeater('Repeater2', 2, 2)
// const r3 = new Repeater('Repeater3', 2, 3)
// const r4 = new Repeater('Repeater4', 2, 4)
// const r5 = new Repeater('Repeater5', 2, 5)
// const r6 = new Repeater('Repeater6', 8, 6)
// const r7 = new Repeater('Repeater7', 2, 7)
// const r8 = new Repeater('Repeater8', 2, 8)
// const r9 = new Repeater('Repeater9', 2, 9)
// const r10 = new Repeater('Repeater10', 2, 10)
// const r11 = new Repeater('Repeater11', 8, 11)
// const r12 = new Repeater('Repeater12', 2, 12)
// const r13 = new Repeater('Repeater13', 2, 13)
// const r14 = new Repeater('Repeater14', 2, 14)
// const r15 = new Repeater('Repeater15', 2, 15)
// const r16 = new Repeater('Repeater16', 4, 16)
// const l1 = new Link(r1, r2, r1.getQM(1), r2.getQM(1), 1)
// const l2 = new Link(r1, r3, r1.getQM(2), r3.getQM(1), 2)
// const l3 = new Link(r1, r4, r1.getQM(3), r4.getQM(1), 3)
// const l4 = new Link(r1, r5, r1.getQM(4), r5.getQM(1), 4)
// const l5 = new Link(r2, r6, r2.getQM(2), r6.getQM(1), 5)
// const l6 = new Link(r3, r6, r3.getQM(2), r6.getQM(2), 6)
// const l7 = new Link(r4, r6, r4.getQM(2), r6.getQM(3), 7)
// const l8 = new Link(r5, r6, r5.getQM(2), r6.getQM(4), 8)
// const l9 = new Link(r6, r7, r6.getQM(5), r7.getQM(1), 9)
// const l10 = new Link(r6, r8, r6.getQM(6), r8.getQM(1), 10)
// const l11 = new Link(r6, r9, r6.getQM(7), r9.getQM(1), 11)
// const l12 = new Link(r6, r10, r6.getQM(8), r10.getQM(1), 12)
// const l13 = new Link(r7, r11, r7.getQM(2), r11.getQM(1), 13)
// const l16 = new Link(r8, r11, r8.getQM(2), r11.getQM(2), 16)
// const l14 = new Link(r9, r11, r9.getQM(2), r11.getQM(3), 14)
// const l15 = new Link(r10, r11, r10.getQM(2), r11.getQM(4), 15)
// const l17 = new Link(r11, r12, r11.getQM(5), r12.getQM(1), 17)
// const l18 = new Link(r11, r13, r11.getQM(6), r13.getQM(1), 18)
// const l19 = new Link(r11, r14, r11.getQM(7), r14.getQM(1), 19)
// const l20 = new Link(r11, r15, r11.getQM(8), r15.getQM(1), 20)
// const l21 = new Link(r12, r16, r12.getQM(2), r16.getQM(1), 21)
// const l22 = new Link(r13, r16, r13.getQM(2), r16.getQM(2), 22)
// const l23 = new Link(r14, r16, r14.getQM(2), r16.getQM(3), 23)
// const l24 = new Link(r15, r16, r15.getQM(2), r16.getQM(4), 24)


// Grid Graph
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
console.log(stringToBinary.length)
const repeaters = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16]
const links = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24/*, l25, l26, l27, l28*/]
for (var i = 0 ; i < 1/*stringToBinary.length*/ ; i++) {
	const message = { source: r1, target: r16, visited: [r1], content: 1, type:'Bit', id: generateId() }
	

	const qn = new QuantumNetwork({ 
		repeaters, 
		links
	})
	//const receiver = new Receiver(message.target, qn)
	

	const sender = new Sender({senderRepeater: message.source, network: qn, receiverRepeater: message.target, window: new Window() }).generateMessage('a') // send(message)?? get rid of this shit dude! 
	// if (!window.addWindowEvent(new Sender(r1, qn, message).send)){
	// 	setTimeout(() => this, 1000 /* miliseconds */)
	// }
} 

// Random Graph 1: 
// const r1 = new Repeater('Repeater1', 15, 1)
// const r2 = new Repeater('Repeater2', 15, 2)
// const r3 = new Repeater('Repeater3', 15, 3)
// const r4 = new Repeater('Repeater4', 15, 4)
// const r5 = new Repeater('Repeater5', 15, 5)
// const r6 = new Repeater('Repeater6', 15, 6)
// const r7 = new Repeater('Repeater7', 15, 7)
// const r8 = new Repeater('Repeater8', 15, 8)
// const r9 = new Repeater('Repeater9', 15, 9)
// const r10 = new Repeater('Repeater10', 15, 10)
// const r11 = new Repeater('Repeater11', 15, 11)
// const r12 = new Repeater('Repeater12', 15, 12)
// const r13 = new Repeater('Repeater13', 15, 13)
// const r14 = new Repeater('Repeater14', 15, 14)
// const r15 = new Repeater('Repeater15', 15, 15)
// const r16 = new Repeater('Repeater16', 15, 16)
// const l1 = new Link(r4, r7, r4.getQM(5), r7.getQM(7), 1 )
// const l2 = new Link(r7, r14, r7.getQM(2), r14.getQM(15), 2 )
// const l3 = new Link(r8, r10, r8.getQM(11), r10.getQM(15), 3 )
// const l4 = new Link(r11, r13, r11.getQM(12), r13.getQM(14), 4 )
// const l5 = new Link(r10, r12, r10.getQM(8), r12.getQM(13), 5 )
// const l6 = new Link(r3, r12, r3.getQM(2), r12.getQM(8), 6 )
// const l7 = new Link(r5, r11, r5.getQM(11), r11.getQM(1), 7 )
// const l8 = new Link(r6, r15, r6.getQM(7), r15.getQM(10), 8 )
// const l10 = new Link(r11, r15, r11.getQM(8), r15.getQM(5), 10 )
// const l9 = new Link(r12, r16, r12.getQM(5), r16.getQM(11), 9 )
// const l11 = new Link(r9, r13, r9.getQM(1), r13.getQM(6), 11 )
// const l12 = new Link(r6, r11, r6.getQM(2), r11.getQM(15), 12 )
// const l13 = new Link(r8, r13, r8.getQM(2), r13.getQM(13), 13 )
// const l14 = new Link(r11, r14, r11.getQM(1), r14.getQM(9), 14 )
// const l15 = new Link(r3, r9, r3.getQM(4), r9.getQM(8), 15 )
// const l16 = new Link(r10, r14, r10.getQM(11), r14.getQM(9), 16 )
// const l17 = new Link(r6, r14, r6.getQM(2), r14.getQM(10), 17 )
// const l18 = new Link(r2, r3, r2.getQM(10), r3.getQM(3), 18 )
// const l19 = new Link(r1, r11, r1.getQM(12), r11.getQM(10), 19 )
// const l20 = new Link(r11, r12, r11.getQM(3), r12.getQM(10), 20 )
// const l21 = new Link(r6, r7, r6.getQM(10), r7.getQM(13), 21 )
// const l22 = new Link(r2, r7, r2.getQM(15), r7.getQM(10), 22 )
// const l23 = new Link(r4, r8, r4.getQM(14), r8.getQM(6), 23 )
// const l24 = new Link(r2, r16, r2.getQM(9), r16.getQM(6), 24 )
// const l25 = new Link(r8, r11, r8.getQM(6), r11.getQM(8), 25 )
// const l26 = new Link(r5, r12, r5.getQM(3), r12.getQM(2), 26 )
// const l27 = new Link(r3, r8, r3.getQM(13), r8.getQM(1), 27 )
// const l28 = new Link(r5, r15, r5.getQM(3), r15.getQM(8), 28 )

// for (var i = 0 ; i < 200/*stringToBinary.length*/ ; i++) {
// 	const message = { source: r1, target: r16, visited: [r1], content: 1, type:'Bit', id: generateId() }
	

// 	const qn = new QuantumNetwork({ 
// 		repeaters: [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16], 
// 		links: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24, l25, l26, l27, l28],

// 	})
// 	const receiver = new Receiver(message.target, qn)
// 	message.target.setReceiver(receiver)

// 	new Sender({sender: message.source, network: qn, message, receiver: message.target}).generateMessage('armin') // send(message)?? get rid of this shit dude! 
// 	// if (!window.addWindowEvent(new Sender(r1, qn, message).send)){
// 	// 	setTimeout(() => this, 1000 /* miliseconds */)
// 	// }
// } 


// Torus Graph
// const r1 = new Repeater('Repeater1', 4, 1)
// const r2 = new Repeater('Repeater2', 4, 2)
// const r3 = new Repeater('Repeater3', 4, 3)
// const r4 = new Repeater('Repeater4', 4, 4)
// const r5 = new Repeater('Repeater5', 4, 5)
// const r6 = new Repeater('Repeater6', 4, 6)
// const r7 = new Repeater('Repeater7', 4, 7)
// const r8 = new Repeater('Repeater8', 4, 8)
// const r9 = new Repeater('Repeater9', 4, 9)
// const r10 = new Repeater('Repeater10', 4, 10)
// const r11 = new Repeater('Repeater11', 4, 11)
// const r12 = new Repeater('Repeater12', 4, 12)
// const r13 = new Repeater('Repeater13', 4, 13)
// const r14 = new Repeater('Repeater14', 4, 14)
// const r15 = new Repeater('Repeater15', 4, 15)
// const r16 = new Repeater('Repeater16', 4, 16)
// const l1 = new Link(r1, r2, r1.getQM(2), r2.getQM(4), 1)
// const l2 = new Link(r2, r3, r2.getQM(2), r3.getQM(4), 2)
// const l3 = new Link(r3, r4, r3.getQM(2), r4.getQM(4), 3)
// const l4 = new Link(r5, r6, r5.getQM(2), r6.getQM(4), 4)
// const l5 = new Link(r6, r7, r6.getQM(2), r7.getQM(4), 5)
// const l6 = new Link(r7, r8, r7.getQM(2), r8.getQM(4), 6)
// const l7 = new Link(r9, r10, r9.getQM(2), r10.getQM(4), 7)
// const l8 = new Link(r10, r11, r10.getQM(2), r11.getQM(4), 8)
// const l9 = new Link(r11, r12, r11.getQM(2), r12.getQM(4), 9)
// const l10 = new Link(r13, r14, r13.getQM(2), r14.getQM(4), 10)
// const l11 = new Link(r14, r15, r14.getQM(2), r15.getQM(4), 11)
// const l12 = new Link(r15, r16, r15.getQM(2), r16.getQM(4), 12)
// const l13 = new Link(r1, r5, r1.getQM(3), r5.getQM(1), 13)
// const l16 = new Link(r4, r8, r4.getQM(3), r8.getQM(1), 16)
// const l14 = new Link(r2, r6, r2.getQM(3), r6.getQM(1), 14)
// const l15 = new Link(r3, r7, r3.getQM(3), r7.getQM(1), 15)
// const l17 = new Link(r5, r9, r5.getQM(3), r9.getQM(1), 17)
// const l18 = new Link(r6, r10, r6.getQM(3), r10.getQM(1), 18)
// const l19 = new Link(r7, r11, r7.getQM(3), r11.getQM(1), 19)
// const l20 = new Link(r8, r12, r8.getQM(3), r12.getQM(1), 20)
// const l21 = new Link(r9, r13, r9.getQM(3), r13.getQM(1), 21)
// const l22 = new Link(r10, r14, r10.getQM(3), r14.getQM(1), 22)
// const l23 = new Link(r11, r15, r11.getQM(3), r15.getQM(1), 23)
// const l24 = new Link(r12, r16, r12.getQM(3), r16.getQM(1), 24)
// const l25 = new Link(r1, r13, r1.getQM(1), r13.getQM(3), 25)
// const l26 = new Link(r2, r14, r2.getQM(1), r14.getQM(3), 26)
// const l27 = new Link(r3, r15, r3.getQM(1), r15.getQM(3), 27)
// const l28 = new Link(r4, r16, r4.getQM(1), r16.getQM(3), 28)
// const l29 = new Link(r1, r4, r1.getQM(4), r4.getQM(2), 29)
// const l30 = new Link(r5, r8, r5.getQM(4), r8.getQM(2), 30)
// const l31 = new Link(r9, r12, r9.getQM(4), r12.getQM(2), 31)
// const l32 = new Link(r13, r16, r13.getQM(4), r16.getQM(2), 32)


// // TODO: Should message be called packet? Is it actually a packet? ( it kinda is, but at the same time not exactly)
// // TODO: BUG: So, I found this problem that this algorithm will even go through the paths that cant even reach the target! :(

// // const stringToBinary = convertStringToBinary("armin")
// //console.log(stringToBinary.length)
// //const window = new Window()
// for (var i = 0 ; i < 200/*stringToBinary.length*/ ; i++) {
// 	const message = { source: r1, target: r16, visited: [r1], content: 1, type:'Bit', id: generateId() }
	

// 	const qn = new QuantumNetwork({ 
// 		repeaters: [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16], 
// 		links: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24, l25, l26, l27, l28, l29, l30, l31, l32],

// 	})
// 	const receiver = new Receiver(message.target, qn)
	
// 	message.target.setReceiver(receiver)
// 	new Sender({sender: message.source, network: qn, message, receiver: message.target}).generateMessage('armin') // send(message)?? get rid of this shit dude! 
// 	// if (!window.addWindowEvent(new Sender(r1, qn, message).send)){
// 	// 	setTimeout(() => this, 1000 /* miliseconds */)
// 	// }
// } 


// Circular Graph:
// const r1 = new Repeater('Repeater1', 15, 1)
// const r2 = new Repeater('Repeater2', 15, 2)
// const r3 = new Repeater('Repeater3', 15, 3)
// const r4 = new Repeater('Repeater4', 15, 4)
// const r5 = new Repeater('Repeater5', 15, 5)
// const r6 = new Repeater('Repeater6', 15, 6)
// const r7 = new Repeater('Repeater7', 15, 7)
// const r8 = new Repeater('Repeater8', 15, 8)
// const r9 = new Repeater('Repeater9', 15, 9)
// const r10 = new Repeater('Repeater10', 15, 10)
// const r11 = new Repeater('Repeater11', 15, 11)
// const r12 = new Repeater('Repeater12', 15, 12)
// const r13 = new Repeater('Repeater13', 15, 13)
// const r14 = new Repeater('Repeater14', 15, 14)
// const r15 = new Repeater('Repeater15', 15, 15)
// const r16 = new Repeater('Repeater16', 15, 16)
// const l1 = new Link(r1, r8, r1.getQM(1), r8.getQM(4), 1 )
// const l2 = new Link(r8, r7, r8.getQM(1), r7.getQM(4), 2 )
// const l3 = new Link(r7, r6, r7.getQM(1), r6.getQM(4), 3 )
// const l4 = new Link(r6, r5, r6.getQM(1), r5.getQM(4), 4 )
// const l5 = new Link(r5, r4, r5.getQM(1), r4.getQM(4), 5 )
// const l6 = new Link(r4, r3, r4.getQM(1), r3.getQM(4), 6 )
// const l7 = new Link(r3, r2, r3.getQM(1), r2.getQM(4), 7 )
// const l8 = new Link(r2, r1, r2.getQM(1), r1.getQM(4), 8 )
// const l9 = new Link(r9, r16, r9.getQM(1), r16.getQM(4), 9 )
// const l10 = new Link(r16, r15, r16.getQM(1), r15.getQM(4), 10 )
// const l11 = new Link(r15, r14, r15.getQM(1), r14.getQM(4), 11 )
// const l12 = new Link(r14, r13, r14.getQM(1), r13.getQM(4), 12 )
// const l13 = new Link(r13, r12, r13.getQM(1), r12.getQM(4), 13 )
// const l14 = new Link(r12, r11, r12.getQM(1), r11.getQM(4), 14 )
// const l15 = new Link(r11, r10, r11.getQM(1), r10.getQM(4), 15 )
// const l16 = new Link(r10, r9, r10.getQM(1), r9.getQM(4), 16 )
// const l17 = new Link(r1, r3, r1.getQM(3), r3.getQM(2), 17 )
// const l18 = new Link(r3, r5, r3.getQM(3), r5.getQM(2), 18 )
// const l19 = new Link(r5, r7, r5.getQM(3), r7.getQM(2), 19 )
// const l20 = new Link(r7, r1, r7.getQM(3), r1.getQM(2), 20 )
// const l21 = new Link(r2, r4, r2.getQM(3), r4.getQM(2), 21 )
// const l22 = new Link(r4, r6, r4.getQM(3), r6.getQM(2), 22 )
// const l23 = new Link(r6, r8, r6.getQM(3), r8.getQM(2), 23 )
// const l24 = new Link(r8, r2, r8.getQM(3), r2.getQM(2), 24 )
// const l25 = new Link(r4, r11, r4.getQM(5), r11.getQM(5), 25 )
// const l26 = new Link(r5, r10, r5.getQM(5), r10.getQM(5), 26 )
// const l27 = new Link(r6, r9, r6.getQM(5), r9.getQM(5), 27 )
// const l28 = new Link(r7, r16, r7.getQM(5), r16.getQM(5), 28 )
// const l29 = new Link(r9, r11, r9.getQM(3), r11.getQM(2), 29 )
// const l30 = new Link(r11, r13, r11.getQM(3), r13.getQM(2), 30 )
// const l31 = new Link(r13, r15, r13.getQM(3), r15.getQM(2), 31 )
// const l32 = new Link(r15, r9, r15.getQM(3), r9.getQM(2), 32 )
// const l33 = new Link(r10, r12, r10.getQM(3), r12.getQM(2), 33 )
// const l34 = new Link(r12, r14, r12.getQM(3), r14.getQM(2), 34 )
// const l35 = new Link(r14, r16, r14.getQM(3), r16.getQM(2), 35 )
// const l36 = new Link(r16, r10, r16.getQM(3), r10.getQM(2), 36 )

// // const stringToBinary = convertStringToBinary("armin")
// //console.log(stringToBinary.length)
// //const window = new Window()
// for (var i = 0 ; i < 200/*stringToBinary.length*/ ; i++) {
// 	const message = { source: r1, target: r13, visited: [r1], content: 1, type:'Bit', id: generateId() }
	

// 	const qn = new QuantumNetwork({ 
// 		repeaters: [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16], 
// 		links: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20, l21, l22, l23, l24, l25, l26, l27, l28, l29, l30, l31, l32, l33, l34, l35, l36],
// 	})
// 	const receiver = new Receiver(message.target, qn)
	
// 	message.target.setReceiver(receiver)
// 	new Sender({sender: message.source, network: qn, message, receiver: message.target}).generateMessage('armin') // send(message)?? get rid of this shit dude! 
// 	// if (!window.addWindowEvent(new Sender(r1, qn, message).send)){
// 	// 	setTimeout(() => this, 1000 /* miliseconds */)
// 	// }
// } 

/////
// to paste all the cytoscape shit, paste it between these //
/////

ReactDOM.render(
  <div>
    <App/>
  </div>,
  document.getElementById('root')
)
