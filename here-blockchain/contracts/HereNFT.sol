// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./token/ERC721/ERC721.sol";
import "./utils/Counters.sol";
import "./utils/Strings.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract HereNFT is ERC721 {
    
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    event createNFT (uint256 indexed _tokenId, address indexed _owner);

    constructor() ERC721("HERE-NFT", "TBD") {}

    // NFT 구조체
    struct NFT {
        string tokenURI;
        bytes32 hashValue;
    }
    uint256[] private _nftIds;
    mapping(uint256 => NFT) private _nfts;

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
    function donateNFT(
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
    // tokenid 리스트를 받아서 여러개의 nft를 한꺼번에 전송하는 함수
    function donateNFTList(
        address _from,
        address _to,
        uint256[] memory _tokenIdList,
        uint256 _timestamp
    ) public payable {
        require(_from != address(0), "Invalid buyer address");
        require(_to != address(0), "Invalid seller address");
        require(_tokenIdList.length > 0, "Invalid token IDs");

        for (uint i = 0; i < _tokenIdList.length; i++) {
            uint256 tokenId = _tokenIdList[i];
            require(tokenId != 0, "Invalid token ID");

            // Transfer ownership of NFT from seller to buyer
            safeTransferFrom(_from, _to, tokenId);

            // Add transaction log to the transactionLogs array
            transactionLogs.push(
                TransactionLog({
                    from: _from,
                    to: _to,
                    tokenId: tokenId,
                    timestamp: _timestamp
                })
            );
        }
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

    // 최신 토큰아이디를 구하는 함수
    function current() public view returns (uint256) {
        return _tokenIds.current();
    }

    
    // tokenId를 받아 toenURI를 구하는 함수
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // TODO
        _requireMinted(tokenId);
        return tokenURIs[tokenId];
    }

    // 민팅함수
    function create(address to, string memory _tokenURI1, string memory _tokenURI2) public returns (uint256, uint256) {
        _tokenIds.increment();

        uint256 newItemId1 = _tokenIds.current();
        _mint(to, newItemId1);
        tokenURIs[newItemId1] = _tokenURI1;

        bytes32 hashValue1 = keccak256(bytes(_tokenURI1));
        NFT memory nft1 = NFT({
            tokenURI: _tokenURI1,
            hashValue: hashValue1
        });
        _nftIds.push(newItemId1);
        _nfts[newItemId1] = nft1;

        _tokenIds.increment();

        uint256 newItemId2 = _tokenIds.current();
        _mint(to, newItemId2);
        tokenURIs[newItemId2] = _tokenURI2;

        bytes32 hashValue2 = keccak256(bytes(_tokenURI2));
        NFT memory nft2 = NFT({
            tokenURI: _tokenURI2,
            hashValue: hashValue2
        });
        _nftIds.push(newItemId2);
        _nfts[newItemId2] = nft2;

        return (newItemId1, newItemId2);
    }

    // 모든 NFT를 반환하는 함수
    function getAllNFTs() public view returns (NFT[] memory) {
        uint256 totalNFTs = _nftIds.length;
        NFT[] memory nftsList = new NFT[](totalNFTs);
        for (uint256 i = 0; i < totalNFTs; i++) {
            uint256 nftId = _nftIds[i];
            NFT memory nft = _nfts[nftId];
            nftsList[i] = nft;
        }
        return nftsList;
    }   

    function getHashValue(uint256 tokenId) public view returns(bytes32) {
        return _nfts[tokenId].hashValue;
    }

    event NFTVerified(uint256 indexed tokenId, string metadataURI, bytes metadata, bytes32 metadataHash, bytes32 inputHash);

    function verifyNFT(uint256 tokenId, bytes32 hash) public view returns (bool) {
        require(_exists(tokenId), "NFT does not exist");

        // NFT Metadata URI 가져오기
        string memory metadataURI = tokenURI(tokenId);

        // JSON 데이터의 해시값 계산
        bytes32 transactionHash = keccak256(bytes(metadataURI));

         // 계산된 해시값과 입력된 해시값이 일치하는지 확인
        bool verified = transactionHash == hash;


        return verified;
    }

    function verifyNFTList(uint256[][] memory inputList) public view returns (bool[] memory results) {
        results = new bool[](inputList.length);

        for (uint256 i = 0; i < inputList.length; i++) {
            require(inputList[i].length == 2, "Invalid input: array length must be 2");
            uint256 tokenId = inputList[i][0];
            bytes32 hash = bytes32(inputList[i][1]);

            require(_exists(tokenId), "NFT does not exist");

            string memory metadataURI = tokenURI(tokenId);
            bytes32 transactionHash = keccak256(bytes(metadataURI));
            bool verified = transactionHash == hash;
            results[i] = verified;
        }
        return results;
    }
}