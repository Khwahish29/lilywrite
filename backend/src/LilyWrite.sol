// SPDX-License-Identifier: MIT

// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

pragma solidity 0.8.19;
import {console} from "forge-std/Test.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {LilypadEventsUpgradeable} from "./imports/LilypadEventsUpgradeable.sol";
import {LWToken} from "./LWToken.sol";
import "./imports/LilypadCallerInterface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LilyWrite is ERC721 {

    LilypadEventsUpgradeable private bridge;
    LWToken private _LWToken;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 constant private BUY_PRICE = 0.01 ether;
    uint256 private lilyPadFee;
    address private bridgeAddress;

    mapping(uint256 => string) idToPrompt;
    mapping(uint256 => address) idToUser;
    
    struct Poem {
        string prompt;
        string result;
    }

    Poem[] private poems;

    string constant specStart = '{'
        '"Engine": "docker",'
        '"Verifier": "noop",'
        '"PublisherSpec": {"Type": "estuary"},'
        '"Docker": {'
        '"Image": "ghcr.io/bacalhau-project/examples/stable-diffusion-gpu:0.0.1",'
        '"Entrypoint": ["python", "main.py", "--o", "./outputs", "--p", "';

    string constant specEnd =
        '"]},'
        '"Resources": {"GPU": "1"},'
        '"Outputs": [{"Name": "outputs", "Path": "/outputs"}],'
        '"Deal": {"Concurrency": 1}'
        '}';

    event Fulfilled(address _from, uint256 _jobId, LilypadResultType _resultType, string _result);
    event Cancelled(address _from, uint _jobId, string _errorMsg);

    constructor(address _bridgeAddress) ERC721("LilyWrite", "LW") {
        _LWToken = new LWToken("LWToken", "LW");
        bridgeAddress = _bridgeAddress;
        bridge = LilypadEventsUpgradeable(_bridgeAddress);
        lilyPadFee = bridge.getLilypadFee();
    }

    function buyLWTokens() external payable {
        require(msg.value >= BUY_PRICE, "Send enough tokens!");
        _LWToken.mint(msg.sender, 5e18);
    }

    function generatePoem(string calldata _prompt) external payable {
        require(msg.value >= lilyPadFee, "Not enough to run Lilypad job");
        _LWToken.transferFrom(msg.sender, address(this), 1e18);
        string memory spec = string.concat(specStart, _prompt, specEnd);
        uint256 id = bridge.runLilypadJob{value: lilyPadFee}(address(this), spec, uint8(LilypadResultType.CID));
        require(id > 0, "job didn't return a value");
        idToPrompt[id] = _prompt;
        idToUser[id] = msg.sender;
    }

    function lilypadFulfilled(address _from, uint256 _jobId, LilypadResultType _resultType, string calldata _result) external {
        require(_from == address(bridge));
        require(_resultType == LilypadResultType.CID);
        Poem memory poem = Poem({
            prompt: idToPrompt[_jobId],
            result: _result
        });
        poems.push(poem);
        address user = idToUser[_jobId];
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(user, tokenId);
        delete idToPrompt[_jobId];
        delete idToUser[_jobId];
        emit Fulfilled(_from, _jobId, _resultType, _result);
    }
    //removed override

    function lilypadCancelled(address _from, uint _jobId, string calldata _errorMsg) external {
        require(_from == address(bridge));
        address user = idToUser[_jobId];
        _LWToken.transfer(user, 1e18);
        delete idToPrompt[_jobId];
        delete idToUser[_jobId];
        emit Cancelled(_from, _jobId, _errorMsg);
    }
    //removed override

    function setBridgeAddress(address _bridgeAddress) external {
        bridgeAddress = _bridgeAddress;
    }

    function setLPEventsAddress(address _eventsAddress) external {
        bridge = LilypadEventsUpgradeable(_eventsAddress);
    }

    function _getLilyPadFee() public view returns(uint256) {
        uint256 fee = bridge.getLilypadFee();
        return fee;
    }
}