// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "./token/ERC721/ERC721.sol";
import "./token/ERC721/IERC721.sol";
contract NFTTransactionLogger {
    IERC721 public nftToken;
    // 이벤트 구조체
    struct TransactionLog {
        address buyer;
        address seller;
        uint256 tokenId;
        uint256 timestamp;
    }

    // 이벤트 배열
    TransactionLog[] public transactionLogs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    // ERC-721 토큰
    //IERC721 private nftToken;
    //ERC721 private nftToken;

    // 생성자

    constructor(address _nftTokenAddress) {
        //nftToken = ERC721(_nftTokenAddress);
        nftToken = IERC721(_nftTokenAddress);
    }
    // NFT 거래 기록을 추가하는 함수
    function addTransactionLog(
        address _buyer,
        address _seller,
        uint256 _tokenId,
        uint256 _timestamp
    ) external {
        require(
            msg.sender == address(nftToken),
            "Only NFT contract can add transaction log"
        );
        transactionLogs.push(
            TransactionLog({
                buyer: _buyer,
                seller: _seller,
                tokenId: _tokenId,
                timestamp: _timestamp
            })
        );
        emit Transfer(_seller, _buyer, _tokenId);
    }

    // 특정 NFT의 거래 기록을 조회하는 함수
    function getTransactionLogs(uint256 _tokenId)
        external
        view
        returns (TransactionLog[] memory)
    {
        uint256 count = 0;
        for (uint256 i = 0; i < transactionLogs.length; i++) {
            if (transactionLogs[i].tokenId == _tokenId) {
                count++;
            }
        }
        TransactionLog[] memory logs = new TransactionLog[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < transactionLogs.length; i++) {
            if (transactionLogs[i].tokenId == _tokenId) {
                logs[index] = transactionLogs[i];
                index++;
            }
        }
        return logs;
    }
}