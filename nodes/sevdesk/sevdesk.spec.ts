import { sevdesk } from './sevdesk.node';

test('smoke', () => {
  const node = new sevdesk();
  expect(node.description.properties).toBeDefined();
});

