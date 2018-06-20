package quantumProtocol;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import quantumProtocol.Event.eventType;

public class SendData extends Thread{
	public Repeater repeater;
	public LossyLink link;
	public Qubit data;
	public Qubit sentData;
	public Event event = new Event(eventType.EXTERNAL);
	public List<Repeater> visitedRepeaters = new ArrayList<Repeater>();
	public boolean visited = false;
	
	public SendData(Repeater from, Qubit data, List<Repeater> vr) {
		this.repeater = from;
		this.data = data;
		this.visitedRepeaters = vr;
	}
	
	public SendData(Repeater repeater, LossyLink link, Qubit data, Event event) {
		this.repeater = repeater;
		this.link = link;
		this.data = data;
		this.event = event;
	}
	
	public List<Repeater> getVisitedRepeaters(){
		return this.visitedRepeaters;
	}
	
	@Override
	public void run() {
		if(event.type == event.type.EXTERNAL) {
			//compute the loss of data going through the lossy link
		    //on the receiving repeater, tell it that it got the data
			//Random rand = new Random();
			//this.sentData = new Qubit(data.getData() /* .substring( rand.nextInt( data.getData().length()  ) ) */ );
			//this.repeater.receiveData(sentData);
			//visitedRepeaters.add(this.repeater);
			handleExternal();
			
		}
		if (event.type == event.type.INTERNAL) {
			//compute the loss of data going through the repeater from one quantum memory to another
		}
	}
	
	private boolean findRepeater(String repeaterId) {
		Optional<Repeater> value = visitedRepeaters
	            .stream()
	            .filter(a -> a.getId().equals(repeaterId))
	            .findFirst();
		return value.isPresent();
	}
	
	public void handleExternal() {
		Random rand = new Random();
		System.out.println(findRepeater(this.repeater.getId()));
		if (!findRepeater(this.repeater.getId())) {
			this.sentData = new Qubit(data.getData() /* .substring( rand.nextInt( data.getData().length()  ) ) */ );
			for (int i = 0 ; i < this.repeater.allNeighbours.size() ; i++) {
				//this.repeater.deleteItselfFromAllNeighbourList();
				this.visitedRepeaters.add(this.repeater.allNeighbours.get(i).getTarget(this.repeater));
				//this.repeater = this.repeater.allNeighbours.get(i).target;
				System.out.println("current repeater is " + this.repeater + " and its neighbours are " + this.repeater.getAllNeighbours());
				this.repeater.allNeighbours.get(i).getTarget(this.repeater).receiveData(sentData);
				
				
			}
			//this.repeater.receiveData(sentData);
			//visitedRepeaters.add(this.repeater);
			
			System.out.println(visitedRepeaters);
			//this.stop();
		}
		
		//new SendData();
	}
	
	public void handleInternal() {
		
	}
}
