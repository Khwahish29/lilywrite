// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {LilypadEventsUpgradeable} from "./imports/LilypadEventsUpgradeable.sol";
import "./imports/LilypadCallerInterface.sol";

contract LilyWrite is ERC20 {
    constructor() ERC20("LilyWrite", "LW") {}
}