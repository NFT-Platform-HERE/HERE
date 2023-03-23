import { hereContract } from "../../constants/web3Config";

export const mintBloodNFT = async (account: string, metadata: string) => {
  const result = await hereContract.methods
    .create(account, metadata)
    .send({ from: account });
  console.log("result", result);
  const tokenId = result.events.Transfer.returnValues.tokenId;
  console.log("tokenId", tokenId);
  const hash = result.transactionHash;
  console.log("hash", hash);
};
