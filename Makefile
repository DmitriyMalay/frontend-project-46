install:
	npm ci

publish:
	npm publish --dry-run

make lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

test-coverage:   	
	npm test -- --coverage --coverageProvider=v8