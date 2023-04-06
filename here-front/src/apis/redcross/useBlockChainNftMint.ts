import { BlockChainMint } from "@/types/BlockChainMint";
import { useMutation } from "react-query";
import { mintBloodNFT } from "../blockchain/contracts";

const fetcher = (payload: BlockChainMint) =>
  mintBloodNFT(
    payload.account,
    payload.agencyTokenUrl,
    payload.hospitalTokenUrl,
  ).then((data) => data);

const useBlockChainNftMint = () => {
  return useMutation(fetcher, {});
};

export default useBlockChainNftMint;
