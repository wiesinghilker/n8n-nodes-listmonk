import { listmonk } from './listmonk.node';

test('smoke', () => {
  const node = new listmonk();
  expect(node.description.properties).toBeDefined();
});

