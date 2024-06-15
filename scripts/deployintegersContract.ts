import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { IntegersContract } from '../wrappers/IntegersContract';

export async function run(provider: NetworkProvider) {
  const integersContract = provider.open(await IntegersContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

  await integersContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Deploy',
      queryId: 0n,
    },
  );

  await provider.waitForDeploy( integersContract.address);

  console.log('ID', await integersContract.getId());
}
