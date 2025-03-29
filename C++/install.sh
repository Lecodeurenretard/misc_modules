#!/bin/bash

if [[ ! -d "/usr/include/c++/nlibs/" ]]; then
	echo "Creating the nlibs directory."
	sudo mkdir /usr/include/c++/nlibs/
	sudo ln -s /usr/include/c++/nlibs/ /usr/include/nlibs/
fi

for header in *.h *.hpp; do
	[[ $header = "*.hpp" || $header = "*.h" ]] && continue
	
	echo "Copying \`$header\` in /usr/include" 
	sudo cp "$header" "/usr/include/c++/nlibs/$header"
done