import { NFT_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { Mint } from "./../../types/Mint";

const fetcher = (payload: Mint) =>
  axios
    .post(NFT_SERVER_URL + `/nft`, {
      bdType: payload.bdType,
      hashValue: payload.hashValue,
      imgUrl: payload.imgUrl,
      issuerId: payload.issuerId,
      ownerId: payload.ownerId,
      place: payload.place,
      tokenId: payload.tokenId,
      nftType: payload.nftType,
    })
    .then(({ data }) => data);

const useNftMintQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useNftMintQuery;
