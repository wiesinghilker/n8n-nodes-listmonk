#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { get } from 'node:https';

const YAML_URL = 'https://api.sevdesk.de/openapi.yaml';
const OUT = 'nodes/sevdesk/openapi.json';

function fetch(url) {
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetch(res.headers.location));
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

async function main() {
  // Fetch YAML and convert to JSON (uses dev dep 'yaml')
  try {
    const yamlText = await fetch(YAML_URL);
    const { parse } = await import('yaml');
    const json = parse(yamlText);
    writeFileSync(OUT, JSON.stringify(json, null, 2));
    console.log(`Wrote ${OUT} from YAML endpoint`);
  } catch (err) {
    console.error('Failed to fetch/convert SevDesk OpenAPI. Ensure dev dep "yaml" is installed or use `make up-sevdesk`.');
    console.error(String(err?.message || err));
    process.exit(1);
  }
}

main();
