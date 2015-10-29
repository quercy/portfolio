all: build

./node_modules:
	npm install

build: ./node_modules ./src/* ./src/**/* ./build.js ./layouts/* ./layouts/*/* Makefile
	node build.js
	mkdir build/js && browserify ./src/js/*.js > ./build/js/bundle.js


watch: ./node_modules
	node build.js --watch

dev: ./node_modules
	node build.js --watch --dev

deploy: build
	./deploy.sh

clean:
	rm -r ./build
