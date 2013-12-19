
build: components
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

test: node_modules
	@node_modules/.bin/mocha test/tests.js

node_modules: package.json
	@npm install

test-browser: build
	open test/index.html

.PHONY: test build test-browser
