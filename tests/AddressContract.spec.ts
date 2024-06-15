import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox"
import { AddressContract } from "../wrappers/AddressContract";
import { toNano } from "@ton/core";
import '@ton/test-utils';

describe('AddressContract', () => {
  let blockchain: Blockchain
  let deployer: SandboxContract<TreasuryContract>;
  let addressContract: SandboxContract<AddressContract>;

  beforeEach(async() => {
    blockchain = await Blockchain.create();
    addressContract = blockchain.openContract(await AddressContract.fromInit(0n));

    deployer = await blockchain.treasury('deployer');

    await addressContract.send(
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
    const id = await addressContract.getId()
    expect(id).toBe(0n);
  });
})