
build: components
	@component build --dev

clean:
	@rm -fr build components node_modules

components: component.json
	@component install --dev

node_modules: package.json
	@npm install

test: node_modules
	@node_modules/.bin/mocha test/tests.js

test-browser: build
	@open test/index.html

.PHONY: clean test test-browser
