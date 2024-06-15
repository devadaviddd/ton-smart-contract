import "@stdlib/deploy";

message IsDeployerRequest { 
  queryId: Int as uint64;
  senderAddress: Address;
}  


contract AddressContract with Deployable {
  id: Int as uint32;
  address: Address;
  deployerAddress: Address;
  isDeployerRequest: Bool = false;

  init(id: Int) {
    self.id = id;
    self.address = myAddress();
    self.deployerAddress = sender();
  }

    receive(msg: IsDeployerRequest) {
      if (self.deployerAddress == msg.senderAddress) {
        self.isDeployerRequest = true;
        dump("Sender is the deployer.");
      } else {
        self.isDeployerRequest = false;
        dump("Sender is not the deployer.");
      }
    }

  get fun id(): Int {
    return self.id;
  }

  get fun address(): Address {
    return self.address;
  }
  
  get fun deployerAddress(): Address {
    return self.deployerAddress;
  }

  get fun isDeployerRequest(): Bool {
    return self.isDeployerRequest;
  }
}