// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LWToken is ERC20 {

    error NotOwner();

    address private immutable owner;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        owner = msg.sender;
    }

    modifier  onlyOwner {
        if(msg.sender!=owner) revert  NotOwner();
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}