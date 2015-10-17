all: build

./node_modules:
	npm install

build: ./node_modules ./src/* ./src/**/*
	node build.js

watch: ./node_modules
	node build.js --watch

dev: ./node_modules
	node build.js --watch --dev

deploy:
	./deploy.sh

clean:
	rm -r ./build
