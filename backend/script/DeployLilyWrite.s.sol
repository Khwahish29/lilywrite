// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {LilyWrite} from "../src/LilyWriteV2.sol";

contract DeployLilyWrite is Script {

    address constant MODICUM =  0x422F325AA109A3038BDCb7B03Dd0331A4aC2cD1a;

    function run() public returns(LilyWrite) {
        vm.startBroadcast();
        LilyWrite lilywrite = new LilyWrite(MODICUM);
        vm.stopBroadcast();
        return lilywrite;
    }
    
}