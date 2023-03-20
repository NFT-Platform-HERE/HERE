// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";
import "./utils/Strings.sol";
import "./NFTTransactionLogger.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract HereNFT is ERC721 {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;
    //uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

   event createNFT (uint256 indexed _tokenId, address indexed _owner);

    constructor() ERC721("HERE-NFT", "TBD") {}

    function current() public view returns (uint256) {
        return _tokenIds.current();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // TODO
        _requireMinted(tokenId);
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        // TODO
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        tokenURIs[newItemId] = _tokenURI;
        emit createNFT(newItemId, to);
        return newItemId;
    }
}