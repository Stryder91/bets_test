// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BettingPool {
  uint storedData;
  string public name = "Milk Tea Pool";
  address public owner;
  mapping(address => uint) public stakingBalance;
  address payable sc;

  constructor() public {
    owner = msg.sender;
  }

  // function stakeTokens(uint _amount) public {
  //   // Require amount greater than 0
  //   require(_amount > 0, "amount cannot be 0");
  //   // Update staking balance
  //   stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
  // }

  // // Unstaking Tokens (Withdraw)
  // function unstakeTokens() public {
  //   // Fetch staking balance
  //   uint balance = stakingBalance[msg.sender];
  //   require(balance > 0, "staking balance cannot be 0");

  //   // Reset staking balance
  //   stakingBalance[msg.sender] = 0;
  // }

  function set(uint _amount) public {
    stakingBalance[msg.sender] = _amount;
    // token.transfer(address(this), _amount);
    payable(address(this)).transfer(_amount);
    storedData = _amount;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getBalance() public view returns(uint) {
    return address(this).balance;    
  } 
}
