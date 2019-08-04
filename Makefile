doc:
	npx compodoc -p tsconfig.json

doc-server:
	npx compodoc -p tsconfig.json -s

gen-secret:
	node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
