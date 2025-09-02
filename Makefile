.PHONY: clean build link start dev

lint:
	npm run lint

build:
	npm run build

link:
	npm link

start:
	cd ~/.n8n/custom && npm link @wiesinghilker/n8n-nodes-sevdesk && n8n start

tests:
	npm run test

dev:
	make clean
	# make lint
	make tests
	make build
	make link
	make start

clean:
	rm -rf ./dist

up-sevdesk:
	# Fetch SevDesk OpenAPI and convert YAML -> JSON (requires curl and npx)
	curl -fsSL https://api.sevdesk.de/openapi.yaml -o ./nodes/sevdesk/openapi.yaml
	npx -y js-yaml -j ./nodes/sevdesk/openapi.yaml > ./nodes/sevdesk/openapi.json
