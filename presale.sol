// SPDX-License-Identifier: MIT;
pragma solidity ^0.8.0;


contract PreToken{
    IERC20 public token;
    uint256 public rate = 10;
    uint256 public endtime;

    constructor(address _token, uint256 _endtime) {
        token = IERC20(_token);
        endtime = _endtime;
        owner = msg.sender;
    }
    mapping (address => uint256) public balances;
    address public owner;

    function buyPreSale() payable external  {
        require(block.timestamp < endtime, "pre-sale ended");
        uint256 ethAmount = msg.value;
        uint256 tokenAmount = rate * ethAmount;
        balances[msg.sender] = tokenAmount; 
    }
    function sellPreSale( uint256 ethAmount) payable  public{
        require(balances[msg.sender] >= ethAmount);

        uint256 refund = ethAmount / rate;
        balances[msg.sender] -= ethAmount;
        payable(msg.sender).transfer(refund);
    }
    function claimPreSale() payable  external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No tokens to claim");
        token.transfer(msg.sender, amount);
        balances[msg.sender] = 0;
    }
}