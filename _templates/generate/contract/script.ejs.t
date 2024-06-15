---
to: scripts/deploy<%= h.inflection.camelize(name, true) %>Contract.ts
---
import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { <%= h.inflection.camelize(name, false) %>Contract } from '../wrappers/<%= h.inflection.camelize(name, false) %>Contract';

export async function run(provider: NetworkProvider) {
  const <%= h.inflection.camelize(name, true) %>Contract = provider.open(await <%= h.inflection.camelize(name, false) %>Contract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

  await <%= h.inflection.camelize(name, true) %>Contract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Deploy',
      queryId: 0n,
    },
  );

  await provider.waitForDeploy( <%= h.inflection.camelize(name, true) %>Contract.address);

  console.log('ID', await <%= h.inflection.camelize(name, true) %>Contract.getId());
}
