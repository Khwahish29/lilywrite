// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {LilyWrite} from "../src/LilyWrite.sol";
import {DeployLilyWrite} from "../script/DeployLilyWrite.s.sol";


contract LilyWriteTest is Test {

    LilyWrite lilywrite;
    string prompt = "A elephant standing upside down";

    function setUp() public {
        DeployLilyWrite deployer = new DeployLilyWrite();
        lilywrite = deployer.run();
    }

    function testIsEverythingWorking() public {
        uint256 fee = lilywrite._getLilyPadFee();
        lilywrite.generatePoem{value : fee}(prompt);
    }
}