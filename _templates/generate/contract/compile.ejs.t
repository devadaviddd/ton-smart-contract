---
to: wrappers/<%= h.inflection.camelize(name) %>Contract.compile.ts
---
import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
  lang: 'tact',
  target: 'contracts/<%= h.inflection.camelize(name, true) %>_contract.tact',
  options: {
    debug: true,
  },
};