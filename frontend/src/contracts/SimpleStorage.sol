// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Token.sol';

contract SimpleStorage {
  uint storedData;
  address private owner;
  mapping(address => uint) public stakingBalance;

  constructor() public {
    owner = msg.sender;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
  function getOwner() public view returns (address) {    
    return owner;
  }
  function getOwnerBalance() public view returns(uint){
    return owner.balance;
  }
  
  function getPoolBalance() public view returns(uint){
    return address(this).balance;
  }

  function transfer() external {
    Token token = Token(0xc28eBfdc50DF35f81becECaE8d8ec1D0E4478Cb6);
    token.transfer(msg.sender, 22);
  }
}
