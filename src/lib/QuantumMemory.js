const { calculateLossQ, logData, QSuccessRate, deadPath, pushEvent, generateId } = require('./utils')
const { Event } = require('./Event')
class QuantumMemory {

	constructor(repeater /* Repeater */, id /* Integer */) {
		this.repeater = repeater
		this.id = id
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
		switch(message.type){
			case 'String':
				// TODO: What the hell is this if statement? When will the message become an empty string instead of an object?!
				if (message === ''){
					// TODO: Is this a deadPath?
				} else {
					console.log(logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`))
					target.receiveDataFromQM(calculateLossQ(message), linkToSendData)
				}
				break
			case 'Bit':
				if (QSuccessRate()){
					console.log(logData(`A message with content '${message.content}' was received and is being sent to ${target.getId()} through link ${linkToSendData.getId()}`))
					target.receiveDataFromQM(message, linkToSendData)
				}
				else {
					deadPath(message, { actionType: 'INTERNAL', source: this, target: target } )
				}
				break
			default:
				break
		}	

	}

	receiveDataFromQM(message /* Object */, linkToSendData /* Link */){
		console.log(logData(`Message received. Content: '${message.content}'`))
		pushEvent(new Event('EXTERNAL', { source: this.repeater, target: linkToSendData.otherEnd(this.repeater), link: linkToSendData }, generateId(), message ))
	}

}

module.exports = { QuantumMemory }
