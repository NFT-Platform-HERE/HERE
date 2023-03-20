// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract NFTVerification {
    
    function verifyNFT(address nftAddress, uint256 nftId, bytes memory signature) public view returns (bool) {
        // 1. NFT의 컨트랙트 주소 확인
        IERC721 nftContract = IERC721(nftAddress);
        
        // 2. NFT 소유자 확인
        address owner = nftContract.ownerOf(nftId);
        
        // 3. 소유자의 공개키와 서명 확인
        bytes32 message = prefixed(keccak256(abi.encodePacked(nftId, address(this))));
        address signer = ECDSA.recover(message, signature);
        require(signer == owner, "Invalid signature");
        
        // 4. NFT의 상태 확인
       // uint256 state = nftContract.tokenState(nftId);
        //require(state == 1, "NFT is not available for transfer");
        
        return true;
    }
    
    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }
}
