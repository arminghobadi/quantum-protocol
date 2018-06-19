package quantumProtocol;

public class Event {
	
	public enum eventType {
		INTERNAL,
		EXTERNAL
	}

	public eventType type;
	
	public Event(eventType type) {
		this.type = type;
	}
}
