import "@stdlib/deploy";

message Add {
  queryId: Int as uint64;
}

contract IncrementContract with Deployable {
  id: Int as uint32;
  val: Int as uint32;

  init(id: Int) {
    self.id = id;
    self.val = 0;
  }

  receive(msg: Add) {
    self.val = self.val + 1;
  }

  get fun id(): Int {
    return self.id;
  } 

  get fun val(): Int {
    return self.val;
  }
}