all: build

./node_modules:
	npm install

build: ./node_modules ./src/* ./src/**/* ./build.js ./layouts/**/* Makefile ./src/js/jquery.js ./src/js/velocity.js ./src/js/js-cookie.js
	node build.js

watch: ./node_modules
	node build.js --watch

dev: ./node_modules
	node build.js --watch --dev

deploy: build
	./deploy.sh

clean:
	rm -r ./build

./src/js/jquery.js: ./node_modules
	cp ./node_modules/jquery/dist/jquery.js ./src/js/jquery.js

./src/js/velocity.js: ./node_modules
	cp ./node_modules/velocity-animate/velocity.js ./src/js/velocity.js

./src/js/js-cookie.js: ./node_modules
	cp ./node_modules/js-cookie/src/js.cookie.js ./src/js/js-cookie.js