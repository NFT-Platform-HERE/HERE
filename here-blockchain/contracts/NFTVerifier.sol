// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "./token/ERC721/IERC721.sol";

/*
위의 스마트 컨트랙트 코드는 IERC721 인터페이스를 사용하여 NFT의 진위 여부를 확인합니다. 
IERC721 인터페이스는 OpenZeppelin의 ERC721 표준을 준수하는 모든 NFT 컨트랙트에서 구현됩니다.
NFTVerifier 컨트랙트는 IERC721 인터페이스를 구현한 NFT 컨트랙트의 주소를 입력으로 받습니다. 
verifyNFT 함수는 NFT의 고유한 ID를 입력받고, 이 NFT가 현재 호출자가 소유하거나 승인받았거나, 
혹은 호출자가 소유자의 모든 NFT에 대해 허용된 운영자인 경우에만 true를 반환합니다.
따라서, 이 스마트 컨트랙트를 사용하여 NFT의 진위 여부를 확인하려면 verifyNFT 함수를 호출하고, 
NFT의 고유한 ID를 인자로 전달하면 됩니다. 
반환값으로 true가 나오면 해당 NFT가 진품이라는 것을 확인할 수 있습니다.
*/
contract NFTVerifier {
    IERC721 public nftContract;

    constructor(address _nftContractAddress) {
        nftContract = IERC721(_nftContractAddress);
    }

    function verifyNFT(uint256 _tokenId) external view returns (bool) {
        address owner = nftContract.ownerOf(_tokenId);
        address approved = nftContract.getApproved(_tokenId);
        bool isApprovedForAll = nftContract.isApprovedForAll(owner, address(this));

        // Check if the owner or an approved operator has the NFT
        if (msg.sender == owner || msg.sender == approved || isApprovedForAll) {
            return true;
        }

        return false;
    }
}

