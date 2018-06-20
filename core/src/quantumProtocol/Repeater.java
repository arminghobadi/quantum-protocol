package quantumProtocol;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * @author armingh
 *
 */
public class Repeater {
	public List<QuantumMemory> nodes;
	public String id;
	public Map<Repeater, LossyLink> neighbours = new HashMap<Repeater, LossyLink>();
	public List<LossyLink> allNeighbours = new ArrayList<LossyLink>();
	public Qubit receivedData;
	
	
	public Repeater() {
		this(Integer.toString(QuantumNetwork.repeaters.size()) );
	}
	
	public Repeater(String id) {
		this(id, new ArrayList<QuantumMemory>());
	}
	
	public Repeater(String id, List<QuantumMemory> nodes) {
		this.id = id;
		this.nodes = nodes;
	}
	
	public void deleteItselfFromAllNeighbourList() {
		for (int i = 0 ; i < allNeighbours.size() ; i++) {
			if ( QuantumNetwork.findRepeater(allNeighbours.get(i).source.getId()).getId() == this.getId()) {
				System.out.println(this + " found it. its" + allNeighbours.get(i));
				allNeighbours.remove(i);
			}
		}
	}
	
	public Repeater getRepeater() {
		return this;
	}
	
	public List<QuantumMemory> getRepeaterArray(){
		return this.nodes;
	}
	
	public void addNode(QuantumMemory node) {
		this.nodes.add(node);
	}
	
	public boolean removeNode(QuantumMemory node) {
		return this.nodes.remove(node);
	}
	
	public QuantumMemory findQM(String qmId) {
		Optional<QuantumMemory> value = nodes
	            .stream()
	            .filter(a -> a.getId().equals(qmId))
	            .findFirst();
		return value.get();
	}
	
	public String getId() {
		return this.id;
	} 
	
	public void setNeighbour(Repeater r, LossyLink link) {
		this.allNeighbours.add(link);
		this.neighbours.put(r, link);
	}
	
	public LossyLink getNeighbour(Repeater r) {
		return this.neighbours.get(r);
	}

	public List<LossyLink> getAllNeighbours(){
		return this.allNeighbours;
	}
	
	public void receiveData(Qubit data) {
		this.receivedData = data;
		System.out.println("The repeater " + this.getId() + " got the data " + data.data);
		new SendData(this, data).run();
	}
	
	@Override
	public boolean equals(Object other){
	    if (other == null) return false;
	    if (other == this) return true;
	    if (!(other instanceof Repeater))return false;
	    Repeater other1 = (Repeater) other;
	    if (this.getId().equals(other1.getId())) {
	    	return true;
	    }
		return false;
	    
	}
	
	/* 
	 * Example: repeater test(["armin","reza"])
	 * test.toString():
	 * test: armin reza
	 * @returns String
	 */
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder(this.nodes.size()+10);
		sb.append("r");
		sb.append(id);
		sb.append(": ");
		for (QuantumMemory temp: this.nodes) {
			sb.append(temp.getId());
			sb.append(" ");
		}
		return sb.toString();
	}
}
