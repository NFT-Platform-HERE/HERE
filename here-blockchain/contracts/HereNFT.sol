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

    event SaleCreated(uint256 indexed saleId, address saleAddr, uint256 ticketId);

    Counters.Counter private _tokenIds;
    //uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    event createNFT (uint256 indexed _tokenId, address indexed _owner);

    constructor() ERC721("HERE-NFT", "TBD") {}

    // NFT 구조체
    struct NFT {
        string tokenURI;
        bytes32 hashValue;
    }
    mapping(uint256 => NFT) public nfts;

    // 이벤트 구조체
    struct TransactionLog {
        address from;
        address to;
        uint256 tokenId;
        uint256 timestamp;
    }
    // 이벤트 배열
    TransactionLog[] public transactionLogs;

    // NFT 거래 기록을 추가하는 함수
    function addTransactionLog(
        address _from,
        address _to,
        uint256 _tokenId,
        uint256 _timestamp
    ) public payable {
        require(_from != address(0), "Invalid buyer address");
        require(_to != address(0), "Invalid seller address");
        require(_tokenId != 0, "Invalid token ID");

        // Transfer ownership of NFT from seller to buyer
        //emit Transfer(_seller, _buyer, _tokenId);
        safeTransferFrom(_from, _to, _tokenId);

        // Add transaction log to the transactionLogs array
        transactionLogs.push(
            TransactionLog({
                from: _from,
                to: _to,
                tokenId: _tokenId,
                timestamp: _timestamp
            })
        );

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

        bytes32 hashValue = keccak256(bytes(_tokenURI));
        NFT memory nft = NFT({
            tokenURI: _tokenURI,
            hashValue: hashValue
        });
        nfts[newItemId] = nft;
        //emit createNFT(newItemId, to);
        return newItemId;
    }

    function getHashValue(uint256 tokenId) public view returns(bytes32) {
        return nfts[tokenId].hashValue;
    }

    event NFTVerified(uint256 indexed tokenId, string metadataURI, bytes metadata, bytes32 metadataHash, bytes32 inputHash);

    function verifyNFT(uint256 tokenId, bytes32 hash) public view returns (bool) {
        require(_exists(tokenId), "NFT does not exist");

        // NFT Metadata URI 가져오기
        string memory metadataURI = tokenURI(tokenId);

        // Metadata URI로부터 JSON 데이터 가져오기
        //bytes memory metadata = abi.encodePacked(metadataURI);
        //bytes32 transactionHash = keccak256(abi.encodePacked(metadataURI));
        bytes32 transactionHash = keccak256(bytes(metadataURI));
        // JSON 데이터의 해시값 계산
        //bytes32 metadataHash = sha256(metadata);

        //NFT memory nft = NFT(tokenId, metadataURI,transactionHash,hash);

         // 계산된 해시값과 입력된 해시값이 일치하는지 확인
        bool verified = transactionHash == hash;


        return verified;
    }
}