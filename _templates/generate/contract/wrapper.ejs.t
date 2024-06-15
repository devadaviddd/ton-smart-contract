---
to: wrappers/<%= h.inflection.camelize(name) %>Contract.ts
# sh: npx blueprint build <%= h.inflection.camelize(name) %>Contract
sh: ./waitWrapper.sh <%= h.inflection.camelize(name) %>
---
export * from '../build/<%= h.inflection.camelize(name) %>Contract/tact_<%= h.inflection.camelize(name) %>Contract';

