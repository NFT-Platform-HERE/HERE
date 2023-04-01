import { NFT_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { Mint } from "../../types/Mint";
import useExpUpdate from "../member/useExpUpdate";

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

const useNftMint = () => {
  const { mutate } = useExpUpdate();
  return useMutation(fetcher, {
    onSuccess: (data, variables) => {
      const payload = {
        memberId: variables.issuerId,
        exp: 15,
      };
      mutate(payload);
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useNftMint;
