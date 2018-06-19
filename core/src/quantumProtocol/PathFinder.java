package quantumProtocol;

import java.util.List;

public class PathFinder {
	public Repeater source;
	public Repeater target;
	public List<Repeater> repeaters;
	public List<LossyLink> links;
	
	public PathFinder(Repeater source, Repeater target, List<Repeater> repeaters, List<LossyLink> links) {
		this.source = source;
		this.target = target;
		this.repeaters = repeaters;
		this.links = links;
	}
	
	
}
