import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { IncrementContract } from '../wrappers/IncrementContract';

export async function run(provider: NetworkProvider, args: string[]) {
  const ui = provider.ui();

  const address = Address.parse(args.length > 0 ? args[0] : await ui.input('IncrementContract address'));

  if (!(await provider.isContractDeployed(address))) {
    ui.write(`Error: Contract at address ${address} is not deployed!`);
    return;
  }

  const incrementContract = provider.open(IncrementContract.fromAddress(address));

  const currentVal = await incrementContract.getVal();

  await incrementContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'Add',
      queryId: 0n,
    },
  );

  ui.write('Waiting for counter to increase...');
  let newVal = await incrementContract.getVal();

  let attempt = 1;
  while (currentVal === newVal) {
    ui.setActionPrompt(`Attempt ${attempt}`);
    await sleep(2000);
    newVal = await incrementContract.getVal();
    attempt++;
  }

  ui.clearActionPrompt();
  ui.write(`Counter increased successfully! From ${currentVal} to ${newVal}`);
}
