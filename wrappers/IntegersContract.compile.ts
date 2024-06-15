import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
  lang: 'tact',
  target: 'contracts/integers_contract.tact',
  options: {
    debug: true,
  },
};