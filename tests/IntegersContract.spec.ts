import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox"
import { IntegersContract } from "../wrappers/IntegersContract";
import { toNano } from "@ton/core";
import '@ton/test-utils';

describe('IntegersContract', () => {
  let blockchain: Blockchain
  let deployer: SandboxContract<TreasuryContract>;
  let integersContract: SandboxContract<IntegersContract>;

  beforeEach(async() => {
    blockchain = await Blockchain.create();
    integersContract = blockchain.openContract(await IntegersContract.fromInit(0n));

    deployer = await blockchain.treasury('deployer');

    await integersContract.send(
      deployer.getSender(),
      {
        value: toNano('0.05'),
      },
      {
        $$type: 'Deploy',
        queryId: 0n,
      }
    )
  })

  it('should initialize with the correct id', async () => {
    const id = await integersContract.getId()
    expect(id).toBe(0n);
  });

  it('should show 8 type if integer in blockchain', async () => {
    const mockAccount = await blockchain.treasury('mockAccount');
    
    const res = await integersContract.send(
      mockAccount.getSender(),
      {
        value: toNano('0.05'),
      },
      {
        $$type: 'ShowAll',
        queryId: 0n,
      },
    );

    expect(res.transactions).toHaveTransaction({
      from: mockAccount.address,
      to: integersContract.address,
      success: true
    })

    
  })

})