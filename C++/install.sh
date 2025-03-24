#!/bin/bash
ls
for header in *.h *.hpp; do
	[[ $header = "*.hpp" || $header = "*.h" ]] && continue
	
	echo "Copying \`$header\` in /usr/include" 
	sudo cp "$header" "/usr/include/c++/nlibs/$header"
done