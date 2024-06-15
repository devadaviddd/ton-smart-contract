import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { IncrementContract } from '../wrappers/IncrementContract';
import '@ton/test-utils';

describe('IncrementContract', () => {
  let blockchain: Blockchain;
  let deployer: SandboxContract<TreasuryContract>;
  let incrementContract: SandboxContract<IncrementContract>;

  beforeEach(async () => {
    blockchain = await Blockchain.create();
    incrementContract = blockchain.openContract(await IncrementContract.fromInit(0n));

    deployer = await blockchain.treasury('deployer');

    const deployResult = await incrementContract.send(
      deployer.getSender(),
      {
        value: toNano('0.05'),
      },
      {
        $$type: 'Deploy',
        queryId: 0n,
      },
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: incrementContract.address,
      deploy: true,
      success: true,
    });
  });

  it('should initialize with the correct id', async () => {
    const id = await incrementContract.getId();
    expect(id).toBe(0n);
  });

  it('should increase counter', async () => {
    const mockAccount = await blockchain.treasury('mockAccount');
    const valBefore = await incrementContract.getVal();

    console.log('val before: ', valBefore);
    const incrementResult = await incrementContract.send(
      mockAccount.getSender(),
      {
        value: toNano('0.05'),
      },
      {
        $$type: 'Add',
        queryId: 0n,
      },
    );

    expect(incrementResult.transactions).toHaveTransaction({
      from: mockAccount.address,
      to: incrementContract.address,
      success: true
    })

    const valAfter = await incrementContract.getVal();
    console.log('val after: ', valAfter);

    expect(valAfter).toBe(valBefore + 1n);
  });
});
