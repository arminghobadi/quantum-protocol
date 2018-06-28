#! /bin/bash
counter=$1
i=0
while [ $i -lt $counter ]; do
	let i=i+1
	node index.js 
	echo "----" >> log.txt
	echo "----" >> stat.txt
done
