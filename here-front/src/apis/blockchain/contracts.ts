import Web3 from "web3";
import { HERE_ERC_721_ABI, HERE_ERC_721_CA } from "@/constants/blockchain";
import { HashValueList } from "@/types/HashValueList";

// 민팅 함수(종이 헌혈증 발행)
export const mintBloodNFT = async (
  account: string,
  agencyTokenUrl: string,
  hospitalTokenUrl: string,
) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract || !account) return;

  const result = await hereContract.methods
    .create(account, agencyTokenUrl, hospitalTokenUrl)
    .send({ from: account });
  return result;
};

// 민팅 함수(적십자 헌혈증 발행)
export const createAndTransfer = async (
  from: string,
  to: string,
  agencyTokenUrl: string,
  hospitalTokenUrl: string,
) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract || !from || !to) return;
  const result = await hereContract.methods
    .createAndTransfer(from, to, agencyTokenUrl, hospitalTokenUrl)
    .send({ from: from });
  return result;
};

// 해당 NFT의 소유주를 알려주는 함수
export const ownerOf = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.ownerOf(tokenId).call();

  return result;
};

// tokenID로 MetaData URL 정보 불러오는 메소드
export const callTokenURI = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.tokenURI(tokenId).call();

  return result;
};

// 헌혈증 NFT 기부 메소드
export const donateNFTList = async (
  myAccount: string,
  sendAccount: string,
  tokenIdList: string[],
) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);
  const timestamp = Math.floor(Date.now() / 1000);

  if (!hereContract) return;

  const result = await hereContract.methods
    .donateNFTList(myAccount, sendAccount, tokenIdList, timestamp)
    .send({ from: myAccount });

  return result;
};

// 헌혈증 NFT 기부 히스토리 불러오는 메소드
export const getTransactionLogs = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.getTransactionLogs(tokenId).call();
};

// TokenID로 Hash값 확인하는 메소드
export const getHashValue = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.getHashValue(tokenId).call();

  return result;
};

// NFT 검증 메소드
export const verifyNFT = async (tokenId: number, hash: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.verifyNFT(tokenId, hash).call();
};

export const verifyNFTList = async (hashValueList: HashValueList[]) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const hashes = hashValueList.map((item) => item.hashValue);
  const tokenIds = hashValueList.map((item) => item.tokenId);

  const result = await hereContract.methods
    .verifyNFTList(tokenIds, hashes)
    .call();

  return result;
};

// 발행한 모든 NFT 조회(테스트 용으로만 사용)
export const getAllNFTs = async () => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const getAllNFTs = await hereContract.methods.getAllNFTs().call();
};
