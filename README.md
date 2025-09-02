# n8n node for Listmonk API

## Overview

This node integrates the Listmonk API into n8n to manage lists, subscribers, campaigns, and related resources.

![node-actions.png](node-actions.png)

## Installation

Add the `@wiesinghilker/n8n-nodes-listmonk` package to your n8n installation:

![installation.png](installation.png)

## Configuration

Configure the base URL of your Listmonk instance (e.g., `https://listmonk.example.com`) and provide admin credentials (HTTP Basic Auth). Requests are made to the admin API under `/api`.

## Development

- Build: `pnpm build`
- Watch: `pnpm dev`
- Test: `pnpm test`
- Lint: `pnpm lint`
- Update OpenAPI: `make up-listmonk`
