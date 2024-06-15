import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { HelloContract } from '../wrappers/HelloContract';

export async function run(provider: NetworkProvider) {
  const helloContract = provider.open(await HelloContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

  await helloContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Deploy',
      queryId: 0n,
    },
  );

  await provider.waitForDeploy(helloContract.address);

  console.log('ID', await helloContract.getId());

  console.log(await helloContract.getGreeting());
}
