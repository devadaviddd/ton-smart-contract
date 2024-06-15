import { Address, toNano } from '@ton/core';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { AddressContract } from '../wrappers/AddressContract';

export async function run(provider: NetworkProvider, args: string[]) {
  const ui = provider.ui();

  const address = Address.parse(args.length > 0 ? args[0] : await ui.input('AddressContract address'));

  if (!(await provider.isContractDeployed(address))) {
    ui.write(`Error: Contract at address ${address} is not deployed!`);
    return;
  }

  const addressContract = provider.open(AddressContract.fromAddress(address));

  const isDeployerRequestBefore = await addressContract.getIsDeployerRequest();

  const deployerAddress = await addressContract.getDeployerAddress();

  const contractAddress = await addressContract.getAddress();

  console.log('contractAddress 1: ', addressContract.address.toString())
  console.log('contractAddress 2: ', contractAddress.toString())

  console.log('deployerAddress: ', deployerAddress.toString())
  console.log('senderAddress: ', provider.sender().address?.toString())

  await addressContract.send(
    provider.sender(),
    {
      value: toNano('0.05'),
    },
    {
      $$type: 'IsDeployerRequest',
      queryId: 0n,
      senderAddress: provider.sender().address! 
    }
  )

  let isDeployerRequestAfter = await addressContract.getIsDeployerRequest();
  ui.write('Waiting for get isDeployerRequest ...');
  let attempt = 1;
  while (isDeployerRequestBefore === isDeployerRequestAfter) {
    ui.setActionPrompt(`Attempt ${attempt}`);
    await sleep(2000);
    isDeployerRequestAfter = await addressContract.getIsDeployerRequest()
    attempt++;
  }
  ui.clearActionPrompt();
  ui.write(`isDeployerRequest get successfully! From ${isDeployerRequestBefore} to ${isDeployerRequestAfter}`);



}
