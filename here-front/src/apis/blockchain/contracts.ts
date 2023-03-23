import Web3 from "web3";
import { HERE_ERC_721_ABI, HERE_ERC_721_CA } from "@/constants/blockchain";

export const mintBloodNFT = async (account: string, metadata: string) => {
  const web3 = new Web3(window.ethereum);
  const hereContract = new web3.eth.Contract(HERE_ERC_721_ABI, HERE_ERC_721_CA);

  const result = await hereContract.methods
    .create(account, metadata)
    .send({ from: account });
  console.log("result", result);
  const tokenId = result.events.Transfer.returnValues.tokenId;
  console.log("tokenId", tokenId);
  const hash = result.transactionHash;
  console.log("hash", hash);
};
