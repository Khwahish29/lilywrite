// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {LilyWrite} from "../src/LilyWriteV2.sol";
import {LWToken} from "../src/LWToken.sol";
import {DeployLilyWrite} from "../script/DeployLilyWrite.s.sol";

contract LilyWriteTest is Test {

    LilyWrite lilywrite;
    address USER = makeAddr("user");
    string prompt = "QmcPjQwVcJiFge3yNjVL2NoZsTQ3GBpXAZe21S2Ncg16Gt";

    function setUp() public {
        DeployLilyWrite deployer = new DeployLilyWrite();
        lilywrite = deployer.run();
    }
    function testShouldBeAbleToBuyLWTokens() public {
        vm.prank(USER);
        vm.deal(USER, 1 ether);
        lilywrite.buyLWTokens{value: 0.01 ether}();
        LWToken token = lilywrite._getLWToken();
        assertEq(token.balanceOf(USER), 5e18);
    }
    function testNoOneElseShouldBeAbleToMintLwTokens() public {
        vm.prank(USER);
        LWToken token = lilywrite._getLWToken();
        vm.expectRevert();
        token.mint(USER, 5e18);
    }
}