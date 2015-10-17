all: build

node_modules:
	npm install

build: ./node_modules
	node build.js

watch: ./node_modules
	node build.js --watch

clean:
	rm -r ./build