pragma solidity ^0.4.2; 
contract AssetTracker {
    string name;
    string Waddress;
    string itemName;
    uint8 quantity;
 
    function setInfo(string Mname,string Maddress, string MitemName, uint8 Mquantity) public {
          name = Mname;
          Waddress = Maddress;
          itemName = MitemName;
          quantity = Mquantity;
    }
 
    function getName() public constant returns (string) {
          return name;
    }
    function getAddress() public constant returns (string){
  		return Waddress;
    }
    function getItemName() public constant returns (string){
    	return itemName;
    }
    function getQuantity() public constant returns (uint8){
    	return quantity;
    }
}