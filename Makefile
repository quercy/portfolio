all: build

./node_modules:
	npm install

build: ./node_modules ./src/* ./src/**/*
	node build.js

watch: ./node_modules
	node build.js --watch

clean:
	rm -r ./build