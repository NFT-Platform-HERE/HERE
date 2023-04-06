import { useMutation } from "react-query";
import { createAndTransfer } from "../blockchain/contracts";
import { BlockChainRedCrossNftMint } from "@/types/BlockChainRedCrossNftMint";

const fetcher = (payload: BlockChainRedCrossNftMint) =>
  createAndTransfer(
    payload.from,
    payload.to,
    payload.agencyTokenUrl,
    payload.hospitalTokenUrl,
  ).then((data) => data);

const useBlockChainRedCrossNftMint = () => {
  return useMutation(fetcher, {});
};

export default useBlockChainRedCrossNftMint;
