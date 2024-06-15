import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { AddressContract } from '../wrappers/AddressContract';

export async function run(provider: NetworkProvider) {
  const addressContract = provider.open(await AddressContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

  await addressContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Deploy',
      queryId: 0n,
    },
  );

  await provider.waitForDeploy( addressContract.address);

  console.log('ID', await addressContract.getId());
}
