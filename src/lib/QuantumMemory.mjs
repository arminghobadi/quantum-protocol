import { calculateLossQ, logData, QSuccessRate, deadPath, generateId } from './utils'
import { Event } from './Event'
import { QuantumNetwork as QN } from './QuantumNetwork'

export class QuantumMemory {

	constructor(repeater /* Repeater */, id /* Integer */) {
		this.repeater = repeater
		this.id = id
	}

	// TODO: This function is basically doing the job of typeOf
	isRepeater(obj){
		return obj === this ? false : true
	}

	getRepeater(){
		return this.repeater
	}

	getLinkConnectedToThisQM(){
		var Link = null
		this.repeater.getLinks()
			.forEach(link => {
				if (link.getSourceQM(this.repeater) === this || link.getTargetQM(this.repeater) === this){
					Link = link
				}
			})
		return Link
	}
  
 	getId(){
		return this.id
	}

	sendToReceivingQM(target /* QuantumMemory */, message /* Object */, linkToSendData /* Link */){
		if (QSuccessRate()){
			logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`)
			return target.receiveDataFromQM(message, linkToSendData)
		}
		else {
			
			return new Event( 'DEAD', { source: this, target: target, link: linkToSendData }, generateId(), message )  
			//deadPath(message, { actionType: 'INTERNAL', source: this, target: target } )
		}
		// switch(message.type){
		// 	case 'String':
		// 		// TODO: What the hell is this if statement? When will the message become an empty string instead of an object?!
		// 		if (message === ''){
		// 			// TODO: Is this a deadPath?
		// 		} else {
		// 			logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`)
		// 			return target.receiveDataFromQM(calculateLossQ(message), linkToSendData)
		// 		}
		// 		break
		// 	case 'Bit':
		// 		if (QSuccessRate()){
		// 			logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`)
		// 			return target.receiveDataFromQM(message, linkToSendData)
		// 		}
		// 		else {
					
		// 			return new Event( 'DEAD', { source: this, target: target, link: linkToSendData }, generateId(), message )  
		// 			//deadPath(message, { actionType: 'INTERNAL', source: this, target: target } )
		// 		}
		// 		break
		// 	default:
		// 		break
		// }	

	}

	receiveDataFromQM(message /* Object */, linkToSendData /* Link */){
		logData(`Message received. Content: '${message.content}'`)
		const event = new Event('EXTERNAL', { source: this.repeater, target: linkToSendData.otherEnd(this.repeater), link: linkToSendData }, generateId(), message )
		//QN.addEvent(event)
		return event
	}

}
