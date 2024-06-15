import "@stdlib/deploy";

contract HelloContract with Deployable {
  id: Int as uint32;

  init(id: Int) {
    self.id = id;
  }

  get fun greeting(): String {
    return "hello world";
  }

  get fun id(): Int {
    return self.id;
  } 
}