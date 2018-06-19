package quantumProtocol;

public class Qubit {
	public String data;
	public int intData;
	
	public Qubit() {
		this("some data");
	}
	
	public Qubit(String data) {
		this.data = data;
	}
	
	public String getData() {
		return this.data;
	}
}