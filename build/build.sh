#!/bin/bash

#------------------------------------------------------------------------------#
#                          ajile build script
#
#               {ajile.net: Smart scripts that play nice!}
#
# Advanced JavaScript Importing & Loading Extension is a JavaScript module that
# provides an API for namespace creation, module dependency management and
# on-demand insertion of inline, local and remote scripts.
#
#           Copyright (c) 2003-2013 Michael A. I. Lee  [iskitz.com]
#
# Created: 2013.02.02.14.43-08.00              Updated: 2013.02.06.04.21-08.00
#------------------------------------------------------------------------------#

# TODO: Create pure JavaScript build script and use ajile to get it's own version.

# NODE.JS?

	if command -v node >/dev/null 2>&1; then
		echo "ajile $1: building with node.js..."
		node <tbd.js.builder> $@
		exit 1
	else
		echo "ajile $1: node.js not available."
	fi


#  START:
	echo "ajile $1: building..."
	cd ../get

#  CLEAN:
	echo "ajile $1: cleaning staging area..."
	rm -rf ajile.$1*

#  STAGE:
	echo "ajile $1: staging..."
	mkdir ajile.$1
	cd ajile.$1
	cp -r ../../code .
	cp -r ../../learn .
	mkdir play
	cp -r ../../play/api play/.
	cp -r ../../play/google play/.
	mkdir play/ideas
	cp -r ../../play/ideas/ajile.ondom* play/ideas/.
	cp -r ../../play/ideas/ajile.simpl* play/ideas/.
	cp -r ../../test .
	mkdir use
	cp -r ../../use/jasmine ./use/.
	cp -r ../../use/syntax* ./use/.
	cp ./code/* ./use/.
	mv ./use/com.iskitz.ajile.src.js ./use/com.iskitz.ajile.$1.src.js
	rm -rf **/.git
	rm -rf **/.DS_Store
	cp ../../build/stage/index.htm .
	cp ../../build/stage/README.txt .

#  COMPRESS:
	echo "ajile $1: minifying source code..."
	java -jar ../../build/yuic/yuicompressor-2.2.4.jar --charset UTF-8 --warn -o ./use/com.iskitz.ajile.$1.js ./code/com.iskitz.ajile.src.js 
   #java -jar ../../build/yuic/yuicompressor-2.2.4.jar --charset UTF-8 --nomunge -o ./use/com.iskitz.ajile.$1.flat.js ./code/com.iskitz.ajile.src.js
	cat ../../build/stage/header.js ./use/com.iskitz.ajile.$1.js > ./use/com.iskitz.ajile.$1.min.js
	cat ../../build/stage/header.js ./use/com.iskitz.ajile.$1.js > ./use/com.iskitz.ajile.js
	mv ./use/com.iskitz.ajile.$1.min.js ./use/com.iskitz.ajile.$1.js
	cp -f ./use/*.* ../../use/.
	cd ..
	echo "ajile $1: creating ajile.$1.zip..."
	zip -9 -o -r -T ajile.$1.zip ajile.$1
 
#  CLEAN:
	echo "ajile $1: deleting staging area..."
	rm -rf ajile.$1
	ls -la
	cd ..

# STOP:
	echo "ajile $1: build complete!"
 