// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {LWToken} from "./LWToken.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface ModicumContract {

    function runModuleWithDefaultMediators(string calldata name, string calldata params)
        external payable returns (uint256);
}   

contract LilyWrite is ERC721, ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public resultJobId;
    uint256 constant private BUY_PRICE = 0.01 ether;
    address private modicumContractAddress;
    ModicumContract private modicumContract;
    LWToken private _LWToken;

    string public resultCID;

    struct Poem {
        string prompt;
        string result;
    }

    mapping(uint256 => address) user;
    mapping(address => string[]) prompts;
    mapping(address => Poem[]) userPoems;

    //0x422F325AA109A3038BDCb7B03Dd0331A4aC2cD1a

    constructor(address _modicumContract) ERC721("LilyWrite", "LW") { 
        require(_modicumContract != address(0), "Contract cannot be zero address");
        modicumContractAddress = _modicumContract;
        modicumContract = ModicumContract(_modicumContract);
        _LWToken = new LWToken("LWToken", "LW");
    }

    function buyLWTokens() external payable {
        require(msg.value >= BUY_PRICE, "Send enough tokens!");
        _LWToken.mint(msg.sender, 5e18);
    }

    function generatePoem(string memory prompt) public payable returns (uint256) {
        require(msg.value >= 2 ether, "Payment of 2 Ether is required");
        //_LWToken.transferFrom(msg.sender, address(this), 1e18);
        uint256 jobID = modicumContract.runModuleWithDefaultMediators{value: msg.value}("fastchat:v0.0.1", prompt);
        user[jobID] = msg.sender;
        prompts[msg.sender].push(prompt);
        return jobID;
    }

    function receiveJobResults(uint256 _jobID, string calldata _cid) public {
        resultJobId = _jobID;
        resultCID = _cid;
        string[] memory _prompts = prompts[user[_jobID]];
        string memory latestPrompt = _prompts[_prompts.length - 1];
        Poem memory poem = Poem(latestPrompt, _cid);
        userPoems[user[_jobID]].push(poem);
        safeMint(user[_jobID]);
    }

    function safeMint(address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _uri) external {
        _setTokenURI(tokenId, _uri);
    }

    function _getLWToken() public view returns(LWToken) {
        return _LWToken;
    }

    function _getPoems(address _user) public view returns (Poem[] memory) {
        return userPoems[_user];
    }

    function _getPrompts(address _user) public view returns(string[] memory) {
        return prompts[_user];
    }

    //The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
