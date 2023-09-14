// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;
import {console} from "forge-std/Test.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {LilypadEventsUpgradeable} from "./imports/LilypadEventsUpgradeable.sol";
import {LWToken} from "./LWToken.sol";
import "./imports/LilypadCallerInterface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LilyWrite is ERC721, ERC721URIStorage {

    LilypadEventsUpgradeable private bridge;
    LWToken private _LWToken;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 constant private BUY_PRICE = 0.01 ether;
    uint256 private lilyPadFee;
    address private bridgeAddress;
    
    string public latestResult;
    string public latestError;

    mapping(uint256 => string) idToPrompt;
    mapping(uint256 => address) idToUser;
    
    struct Poem {
        string prompt;
        string result;
    }

    Poem[] private poems;

    string constant specStart = '{'
      ' "Engine": "Docker" ,'
      ' "Verifier": "Noop" ,'
      ' "Publisher": "Estuary" ,'
      ' "PublisherSpec": { '
      '  "Type": "Estuary" '
      ' }, '
      ' "Docker": { '
        ' "Image": "jsacex/dolly_inference:latest",'
        ' "Entrypoint": [ "python", "inference.py", "--prompt"," ';

    string constant specEnd = ' ", '
      '  "--model_version", "./databricks/dolly-v2-3b" ],'
      ' "WorkingDirectory": "/inputs" },'
      ' "Language": {"JobContext": {}},'
      ' "Wasm": {"EntryModule": {}},'
      ' "Resources": {"GPU": "1"},'
      ' "Network": {"Type": "None"},'
      ' "Timeout": 1800,'
      ' "inputs": [{"StorageSource": "RepoCloneLFS", "Name": "gitlfs://huggingface.co/databricks/dolly-v2-3b.git", "Repo": "https://huggingface.co/databricks/dolly-v2-3b.git", "path": "/inputs"},'
      '  {"StorageSource": "URLDownload", "Name": "https://gist.githubusercontent.com/js-ts/d35e2caa98b1c9a8f176b0b877e0c892/raw/3f020a6e789ceef0274c28fc522ebf91059a09a9/inference.py", "URL": "https://gist.githubusercontent.com/js-ts/d35e2caa98b1c9a8f176b0b877e0c892/raw/3f020a6e789ceef0274c28fc522ebf91059a09a9/inference.py", "path": "/inputs"}],'
      ' "outputs": [{"StorageSource": "IPFS", "Name": "outputs", "path": "/outputs"}],'
      ' "Deal": {"Concurrency": 1}}';

    event Fulfilled(address _from, uint256 _jobId, LilypadResultType _resultType, string _result);
    event Cancelled(address _from, uint _jobId, string _errorMsg);

    constructor(address _bridgeAddress) ERC721("LilyWrite", "LW") {
        bridgeAddress = _bridgeAddress;
        bridge = LilypadEventsUpgradeable(_bridgeAddress);
        lilyPadFee = bridge.getLilypadFee();
        _LWToken = new LWToken("LWToken", "LW");
    }

    function buyLWTokens() external payable {
        require(msg.value >= BUY_PRICE, "Send enough tokens!");
        _LWToken.mint(msg.sender, 5e18);
    }

    function generatePoem(string calldata _prompt) external payable {
        require(msg.value >= lilyPadFee, "Not enough to run Lilypad job");
        //_LWToken.transferFrom(msg.sender, address(this), 1e18);
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
        latestResult = _result;
        address user = idToUser[_jobId];
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(user, tokenId);
        delete idToPrompt[_jobId];
        delete idToUser[_jobId];
        emit Fulfilled(_from, _jobId, _resultType, _result);
    }

    function lilypadCancelled(address _from, uint _jobId, string calldata _errorMsg) external {
        require(_from == address(bridge));
        // address user = idToUser[_jobId];
        // _LWToken.transfer(user, 1e18);
        latestError = _errorMsg;
        delete idToPrompt[_jobId];
        delete idToUser[_jobId];
        emit Cancelled(_from, _jobId, _errorMsg);
    }

    function setTokenURI(uint256 tokenId, string memory _uri) external {
        _setTokenURI(tokenId, _uri);
    }

    function _getLilyPadFee() public view returns(uint256) {
        uint256 fee = bridge.getLilypadFee();
        return fee;
    }

    function _getLWToken() public view returns(LWToken) {
        return _LWToken;
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