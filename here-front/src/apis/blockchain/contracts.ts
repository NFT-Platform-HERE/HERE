import Web3 from "web3";
import { HERE_ERC_721_ABI, HERE_ERC_721_CA } from "@/constants/blockchain";

// 민팅 함수
export const mintBloodNFT = async (account: string, metadata: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract || !account) return;

  const result = await hereContract.methods
    .create(account, metadata)
    .send({ from: account });

  console.log("result", result);

  return result;
};

// 해당 NFT의 소유주를 알려주는 함수
export const ownerOf = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.ownerOf(tokenId).call();

  console.log("ownerOf result", result);

  return result;
};

export const CallTokenURI = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.tokenURI(tokenId).call();

  console.log("CallTokenURI result", result);

  return result;
};

export const donateNFT = async (
  myAccount: string,
  sendAccount: string,
  tokenId: string,
) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);
  const timestamp = Math.floor(Date.now() / 1000);

  if (!hereContract) return;

  const result = await hereContract.methods
    .donateNFT(myAccount, sendAccount, tokenId, timestamp)
    .send({ from: myAccount });

  console.log("donateNFT result", result);
};

export const getTransactionLogs = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.getTransactionLogs(tokenId).call();

  console.log("getTransactionLogs result", result);
};

export const getHashValue = async (tokenId: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.getHashValue(tokenId).call();

  console.log("getHashValue result", result);
};

export const verifyNFT = async (tokenId: string, hash: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  if (!hereContract) return;

  const result = await hereContract.methods.verifyNFT(tokenId, hash).call();

  console.log("verifyNFT result", result);
};
