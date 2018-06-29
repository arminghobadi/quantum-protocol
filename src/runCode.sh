#! /bin/bash
counter=$1
i=0
if [ $# -eq 0 ]
then
	node index.js
	echo "----" >> log.txt
	echo "----" >> stat.txt
elif [ $# -ne 1 ] 
then
	echo "usage: ./runCode numberOfTimesToRunTheCode"
else
	while [ $i -lt $counter ]; do
		let i=i+1
		node index.js 
		echo "----" >> log.txt
		echo "----" >> stat.txt
	done
fi
