import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox"
import { HelloContract } from "../wrappers/HelloContract";
import { toNano } from "@ton/core";

describe('HelloContract', () => {
  let blockchain: Blockchain
  let deployer: SandboxContract<TreasuryContract>;
  let helloContract: SandboxContract<HelloContract>;

  beforeEach(async() => {
    blockchain = await Blockchain.create();
    helloContract = blockchain.openContract(await HelloContract.fromInit(0n));

    deployer = await blockchain.treasury('deployer');

    await helloContract.send(
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
    const id = await helloContract.getId()
    expect(id).toBe(0n);
  });

  it('should return greeting message', async () => {
    const greeting = await helloContract.getGreeting()
    expect(greeting).toBe('hello world');
  });

})