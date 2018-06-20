package quantumProtocol;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import javax.crypto.KeyGenerator;

import quantumProtocol.Event.eventType;

public class QuantumNetwork {
	public static List<Repeater> repeaters = new ArrayList<Repeater>();
	public static List<LossyLink> lossyLinks = new ArrayList<LossyLink>();
	public static Repeater source;
	public static Repeater target;
	public static Map<Repeater, Repeater> repeaterMap = new HashMap<Repeater, Repeater>();
	
	public static List<String> readConfig (String fileName){
		List<String> lines = Collections.emptyList();
	    try
	    {
	      lines =
	       Files.readAllLines(Paths.get(fileName), StandardCharsets.UTF_8);
	    }
	 
	    catch (IOException e)
	    {
	      // do something
	      e.printStackTrace();
	    }
	    return lines;
	}
	
	private static void createRepeater(String line) {
		
		String reps[] =  line.split(" ");
		if (reps.length != 2) {
			throw new ArrayIndexOutOfBoundsException("example: `r1: 4`");
		}
		
		Repeater r = new Repeater(reps[0].substring(1, 2));
		int numberOfQM = Integer.parseInt(reps[1]);
		
		for (int i = 0 ; i < numberOfQM; i++) {
			QuantumMemory qm = new QuantumMemory(r);
			r.addNode(qm);
		}
		//System.out.println(r);
		repeaters.add(r);
		
	}
	
	public static void communication() {
		//attempt starts at Alice
		//every repeater is connected to its neighbors
		for (int i = 0 ; i < repeaters.size() ; i++) {
			//System.out.println(repeaters.get(i).getId() + " - " + repeaters.get(i).allNeighbours.size() + " " + repeaters.get(i).getAllNeighbours());
		}
		new SendData(source, new Qubit()).run();
		for (int i = 0 ; i < source.allNeighbours.size() ; i++) {
			//System.out.println("sending data to " + source.allNeighbours.get(i));
			//new SendData(source, source.allNeighbours.get(i), new Qubit(), new Event(eventType.EXTERNAL) ).run()
			
		}
		
	}
	
	void handleMessage(int sourceNode) {
		//sourceNode tries to send data to all neighboring nodes
		//if the repeater is connected to at least another repeater, the internal function gets called
	}
	
	void handleInternal() {
		//node tries an internal connection
		//computes the success rate
		//if success rate > q, generate event for your neighbor
	}
	
	public static void main(String args[]) {
		List<String> l = readConfig("/home/armingh/config.txt");
		 
	    Iterator<String> line = l.iterator();
	    while (line.hasNext()) {
	    	String currentLine = line.next();
	    	switch (currentLine.charAt(0)) {
	    	case 'r':
	    		createRepeater(currentLine);
	    		break;
	    	case 'l':
	    		createLossyLinks(currentLine);
	    		break;
	    	case 'p':
	    		run(currentLine);
	    		break;	    		
	    	default:
	    		System.out.println("i have nothing to show! :(");
	    		break;
	    	}
	    }   
	}
	
	public LossyLink linkFinder(Repeater s, Repeater t) {
		Repeater neighbour = repeaterMap.get(s);
		if (neighbour == null) {
			
		}
		return null;
	}
	
	public static void run(String line) {
		String lines[] = line.split(" ");
		source = findRepeater(lines[1].substring(1));
		target = findRepeater(lines[2].substring(1));
		communication();
		
		
		
		
	}
	
	public static Repeater findRepeater(String repeaterId) {
		Optional<Repeater> value = repeaters
	            .stream()
	            .filter(a -> a.getId().equals(repeaterId))
	            .findFirst();
		return value.get();
	}
	
	private static LossyLink findLink(String linkId) {
		Optional<LossyLink> value = lossyLinks
	            .stream()
	            .filter(a -> a.getId().equals(linkId))
	            .findFirst();
		return value.get();
	}

	private static void createLossyLinks(String line) {
		String lines[] =  line.split(" ");
		if (lines.length < 2) {
			throw new ArrayIndexOutOfBoundsException("example: `l1: r2qm3 r3qm1`");
		}
		
	    Repeater rsrc = findRepeater(lines[1].substring(1,2));
	    Repeater rtrg = findRepeater(lines[2].substring(1,2));
	    
	    QuantumMemory qsrc = rsrc.findQM(lines[1].substring(4));
	    QuantumMemory qtrg = rtrg.findQM(lines[2].substring(4));
		
		LossyLink l = new LossyLink(rsrc, rtrg, qsrc, qtrg, lines[0].substring(1,2));
		
		repeaterMap.put(rsrc, rtrg);
		repeaterMap.put(rtrg, rsrc);
		
		//System.out.println(l);
		lossyLinks.add(l);
	}
	
	
	/*
	 * config file:
	 * r1: 4
	 * r2: 3
	 * r3: 5
	 * r4: 3
	 * 
	 * l1: r1qm1 r2qm3 0.1
	 * l2: r2qm2 r4qm2 0.1
	 * 
	 * source: r1qm3
	 * dest: r3qm2
	 *
	 */
	
	/*
	 * output:
	 * 
	 * path1: r1qm2 r2qm1 r3qm2
	 * path2: r1qm1 r2qm5 r4qm4
	 */
}
