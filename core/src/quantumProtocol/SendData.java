package quantumProtocol;

import java.util.Random;

public class SendData extends Thread{
	public Repeater repeater;
	public LossyLink link;
	public Qubit data;
	public Qubit sentData;
	public Event event;
	
	public SendData(Repeater repeater, LossyLink link, Qubit data, Event event) {
		this.repeater = repeater;
		this.link = link;
		this.data = data;
		this.event = event;
	}
	
	@Override
	public void run() {
		if(event.type == event.type.EXTERNAL) {
			//compute the loss of data going through the lossy link
		    //on the receiving repeater, tell it that it got the data
			Random rand = new Random();
			this.sentData = new Qubit(data.getData() /* .substring( rand.nextInt( data.getData().length()  ) ) */ );
			this.repeater.receiveData(sentData);
		}
		if (event.type == event.type.INTERNAL) {
			//compute the loss of data going through the repeater from one quantum memory to another
		}
	}
}
