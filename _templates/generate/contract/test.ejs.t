---
to: tests/<%= h.inflection.camelize(name, false) %>Contract.spec.ts
---
import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox"
import { <%= h.inflection.camelize(name, false) %>Contract } from "../wrappers/<%= h.inflection.camelize(name, false) %>Contract";
import { toNano } from "@ton/core";
import '@ton/test-utils';

describe('<%= h.inflection.camelize(name, false) %>Contract', () => {
  let blockchain: Blockchain
  let deployer: SandboxContract<TreasuryContract>;
  let <%= h.inflection.camelize(name, true) %>Contract: SandboxContract<<%= h.inflection.camelize(name, false) %>Contract>;

  beforeEach(async() => {
    blockchain = await Blockchain.create();
    <%= h.inflection.camelize(name, true) %>Contract = blockchain.openContract(await <%= h.inflection.camelize(name) %>Contract.fromInit(0n));

    deployer = await blockchain.treasury('deployer');

    await <%= h.inflection.camelize(name, true) %>Contract.send(
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
    const id = await <%= h.inflection.camelize(name, true) %>Contract.getId()
    expect(id).toBe(0n);
  });
})