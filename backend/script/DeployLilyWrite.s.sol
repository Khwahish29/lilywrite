// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Script} from "forge-std/Script.sol";
import {LilyWrite} from "../src/LilyWrite.sol";

contract DeployLilyWrite is Script {

    address constant LilypadEvents =  0xdC7612fa94F098F1d7BB40E0f4F4db8fF0bC8820;

    function run() public returns(LilyWrite) {
        vm.startBroadcast();
        LilyWrite lilywrite = new LilyWrite(LilypadEvents);
        vm.stopBroadcast();
        return lilywrite;
    }
    
}