import { generateId, calculateLossP, logData, PSuccessRate } from './utils'
import { QuantumMemory } from './QuantumMemory'
import { Event } from './Event'
import { ml } from './utils.mjs';


export class Repeater {
	//getQM() and list of QMs are never used! Should they be there??

	constructor(name /* String */, numberOfQMs /* Integer */, id /* Integer */) {
		this.id = id
		this.name = name
		this.links = []
		this.QMs = []
		for (var i = 1 ; i <= numberOfQMs ; i++){
			this.QMs.push(new QuantumMemory(this, i))
		}
		this.receiver = null
		this.sender = null
		this.isSender = false
		this.isReceiver = false
	}

	isRepeater(obj){
		return this === obj ? true : false
	}

	getName(){
		return this.id
	}

	getId(){
		return this.id
	}

	getLinks(){
		return this.links
	}

	addLink(link) {
		this.links.push(link)
	}

	getQM(id /* Integer */){
		return this.QMs[id-1]
	}

	findLinksToEmitMessage( message ){
		// Without the ML:
		let links = []
		this.links
			.filter(link =>
				!message.visited.includes(link.otherEnd(this)))
			.forEach(link =>
				{
					links.push(link)
			})
		return links

		// With ML
		// let connectedLinks = []
		// let finalLinks = []
		// this.links
		// 	.filter(link =>
		// 		!message.visited.includes(link.otherEnd(this)))
		// 	.forEach(link =>
		// 		{
		// 			connectedLinks.push({ link, success: ml().getLinkSuccessRate(link)})
		// 	})
		// connectedLinks.sort( (el, nextEl)=> nextEl.success - el.success )
		// if (connectedLinks.length > 1){
		// 	finalLinks.push(connectedLinks[0].link)
		// 	finalLinks.push(connectedLinks[1].link)
		// }
		// else {
		// 	connectedLinks.length === 1 ? finalLinks.push(connectedLinks[0].link) : ()=>{}
		// }
		// return finalLinks
	}

	/**	receivedACK(){}
	 * these will be overriden by another class
	 */
	onReceivedPackage(msg){}
	onReceivedACK(msg){}


	receive(message /* Object */, qm /* QuantumMemory */) {
		let result = []
		const messageWithUpdatedVisitedList =
			Object.assign(
				{},
				message,
				{ visited: message.visited.concat([this]) }
			)
		
		logData(`${this.name} received: '${messageWithUpdatedVisitedList.content}'
			This repeater has already visited ` + messageWithUpdatedVisitedList.visited.reduce((output, repeater) => output + repeater.name + ' ', ''))
		
		if (messageWithUpdatedVisitedList.target === this){
			result.push( new Event('DONE',{source: qm, target: qm, link: qm.getLinkConnectedToThisQM()}, generateId(), messageWithUpdatedVisitedList) )
			if (messageWithUpdatedVisitedList.type === 'ACK'){
				this.onReceivedACK(messageWithUpdatedVisitedList)
				//this.sender.receiveACK(messageWithUpdatedVisitedList)
			}
			else {
				//this.receiver.receive(messageWithUpdatedVisitedList)
			}
				
		}
		else 
			this.findLinksToEmitMessage(messageWithUpdatedVisitedList)
			.forEach(link => {
				result.push(new Event('INTERNAL', { source: qm, target: link.getTargetQM(this), link: link}, generateId(), messageWithUpdatedVisitedList))
				// switch (messageWithUpdatedVisitedList.type){
				// 	case 'String':
				// 		result.push(new Event('INTERNAL', { source: qm, target: link.getTargetQM(this), link: link}, generateId(), calculateLossP(messageWithUpdatedVisitedList)))
				// 		break
				// 	case 'Bit':
						
				// 		break
				// 	default:
				// 		break
				// }
			})
		
		return result
	}
}
