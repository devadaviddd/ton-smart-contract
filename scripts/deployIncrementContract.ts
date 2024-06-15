import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { IncrementContract } from '../wrappers/IncrementContract';

export async function run(provider: NetworkProvider) {
  const incrementContract = provider.open(await IncrementContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

  await incrementContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Deploy',
      queryId: 0n,
    },
  );

  await provider.waitForDeploy(incrementContract.address);

  console.log('ID', await incrementContract.getId());
}
