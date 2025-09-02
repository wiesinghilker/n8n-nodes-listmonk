# Repository Guidelines

## Project Structure & Module Organization
- Source: `nodes/` (e.g., `nodes/sevdesk/sevdesk.node.ts`, `openapi.json`, `logo.svg`).
- Credentials: `credentials/` (e.g., `sevdeskApi.credentials.ts`).
- Tests: colocated `*.spec.ts` (e.g., `nodes/sevdesk/sevdesk.spec.ts`).
- Build output: `dist/` (git-ignored; published via `files` in `package.json`).
- Config: `tsconfig.json`, `.eslintrc.js`, `jest.config.js`, `gulpfile.js`, `Makefile`.

## Build, Test, and Development Commands
- Install: `pnpm install` (Node >= 18.10; pnpm >= 9.1).
- Build: `pnpm build` (TypeScript compile + copy icons via Gulp).
- Watch: `pnpm dev` (incremental TypeScript build).
- Test: `pnpm test` (Jest + ts-jest).
- Lint: `pnpm lint` | Fix: `pnpm lintfix`.
- Format: `pnpm format`.
- Run in n8n (local link): `make build && make link && make start` (links into `~/.n8n/custom` and starts n8n).
- Update OpenAPI: `pnpm openapi:sevdesk` (Node script) or `make up-sevdesk`.

## Coding Style & Naming Conventions
- Language: TypeScript, strict mode enabled.
- Formatting: Prettier (2‑space indent, semicolonless per default Prettier v3).
- Linting: ESLint with `eslint-plugin-n8n-nodes-base` presets for `nodes/`, `credentials/`, and `package.json`.
- File naming: `Foo.node.ts`, `Foo.node.json`, `fooApi.credentials.ts`, tests as `*.spec.ts`.
- Class names: PascalCase for classes (e.g., `sevdesk` node class), camelCase for variables.

## Testing Guidelines
- Framework: Jest with ts-jest.
- Location: place tests next to sources (e.g., `nodes/**/something.spec.ts`).
- Style: keep tests fast and deterministic; mock network.
- Run: `pnpm test`.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits where possible (`feat:`, `fix:`, `chore:`). Repository history may include migration from Mittwald to SevDesk.
- PRs: include purpose/summary, screenshots if UI assets change, and link related issues. Ensure `pnpm build`, `pnpm lint`, and `pnpm test` pass.

## Security & Configuration Tips
- Do not commit secrets. API tokens are provided via the `sevdeskApi` credential (sent as `Authorization`).
- Network calls use `baseURL` `https://my.sevdesk.de/api/v1` with JSON headers via `requestDefaults`.

## Architecture Overview
- The node’s properties are generated from `nodes/sevdesk/openapi.json` using `@devlikeapro/n8n-openapi-node` (`N8NPropertiesBuilder`).
- Gulp copies icons from `nodes/**` and `credentials/**` into `dist/` during build.
