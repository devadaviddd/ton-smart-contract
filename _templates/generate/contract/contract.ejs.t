---
to: contracts/<%= h.inflection.camelize(name, true) %>_contract.tact
---
import "@stdlib/deploy";

contract <%= h.inflection.camelize(name) %>Contract with Deployable {
  id: Int as uint32;

  init(id: Int) {
    self.id = id;
  }

  get fun id(): Int {
    return self.id;
  } 
}