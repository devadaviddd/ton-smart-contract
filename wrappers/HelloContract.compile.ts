import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
  lang: 'tact',
  target: 'contracts/hello_contract.tact',
  options: {
    debug: true,
  },
};
