package quantumProtocol;

import java.util.UUID;

/*
 * each quantum memory needs to know the id of the repeater it is in
 */
public class QuantumMemory {
	public String id;
	private final float LOSS_ = 0;
	public Repeater parent;
	public Qubit qubit;
	//the red circles 
	
	public QuantumMemory(Repeater r) {
		this(r, new Qubit());
	}
	
	public QuantumMemory(Repeater r, Qubit data) {
		this(Integer.toString(r.nodes.size()+1), r, data);
	}
	
	public QuantumMemory(String id, Repeater r, Qubit data) {
		this.id = id;
		this.parent = r;
		this.qubit = data;
	}
	
	public String getId() {
		return this.id;
	}
}
