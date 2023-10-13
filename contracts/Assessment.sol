// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address public owner;
    uint256 public blc;

    event Deposited(uint256 amount);
    event Withdrawn(uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(uint256 initialBalance) {
        owner = msg.sender;
        blc = initialBalance;
    }

    function balance() public view returns (uint256) {
        return blc;
    }

    function deposit(uint256 amount) public payable {
        require(msg.sender == owner, "Not authorized to deposit");
        blc += amount;
        emit Deposited(amount);
    }

    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Not authorized to withdraw");
        require(blc >= amount, "Insufficient balance");
        blc -= amount;
        emit Withdrawn(amount);
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Not authorized to transfer ownership");
        require(newOwner != address(0), "Invalid address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }
}
