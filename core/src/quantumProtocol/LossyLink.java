package quantumProtocol;

import java.util.Random;
import java.util.UUID;

public class LossyLink {
	private final float LOSS_ = 0;
	public Repeater source;
	public Repeater target;
	public QuantumMemory sourceNode;
	public QuantumMemory targetNode;
	public String id;
	
	public LossyLink(Repeater source, Repeater target, QuantumMemory sourceNode, QuantumMemory targetNode, String id) {
		this.source = source.getRepeater();
		this.target = target;
		this.sourceNode = sourceNode;
		this.targetNode = targetNode;
		this.id = id;
		//System.out.println("creating a lossy link");
		source.neighbours.put(source, this);
		target.neighbours.put(target, this);
		//System.out.println("adding to source.neightbours. neighbour size = " + source.neighbours.size());
		source.allNeighbours.add(this);
		target.allNeighbours.add(this);
		//System.out.println("adding to allneighbors. allneighbor size = " + source.allNeighbours.size());
	}
	
	public String getId() {
		return this.id;
	}
	
	public boolean eAttempt () { //entaglement attempt
		//random num generator if random num>  loss => success
		Random rand = new Random();
		return rand.nextInt() > LOSS_ ? true : false;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder(20);
		sb.append("l");
		sb.append(id);
		sb.append(": ");
		sb.append("source->r" + source.getId() + "q" + sourceNode.getId());
		sb.append(" target->r" + target.getId() + "q" + targetNode.getId());
		return sb.toString();
	}
}
