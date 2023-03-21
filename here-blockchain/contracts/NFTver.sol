pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function verifyNFT(uint256 tokenId, bytes32 message, uint8 v, bytes32 r, bytes32 s) public view returns (bool) {
        address signer = ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message)), v, r, s);
        return signer == ownerOf(tokenId);
    }
}