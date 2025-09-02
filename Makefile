.PHONY: clean build link start dev up-listmonk

lint:
	pnpm run lint

build:
	pnpm run build

link:
	npm link

start:
	cd ~/.n8n/custom && npm link @wiesinghilker/n8n-nodes-listmonk && n8n start

tests:
	pnpm run test

dev:
	make clean
	# make lint
	make tests
	make build
	make link
	make start

clean:
	rm -rf ./dist

up-listmonk:
	# Fetch Listmonk Swagger YAML and convert to JSON (requires curl; run after pnpm install)
	curl -fsSL https://listmonk.app/docs/swagger/collections.yaml -o ./nodes/listmonk/openapi.yaml
	# Use the installed `yaml` CLI to convert YAML -> JSON
	pnpm exec yaml -j < ./nodes/listmonk/openapi.yaml > ./nodes/listmonk/openapi.json
