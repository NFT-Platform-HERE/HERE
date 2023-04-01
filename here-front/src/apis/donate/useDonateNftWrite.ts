import { NFT_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DonationNft } from "@/types/DonationNft";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (payload: DonationNft) =>
  axios
    .patch(NFT_SERVER_URL + `/nft/donate`, {
      boardId: payload.boardId,
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      nftTokenList: payload.nftTokenList,
    })
    .then(({ data }) => data);

const useDonateNftWrite = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
      return queryClient.invalidateQueries(queryKeys.DONATE_DETAIL);
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateNftWrite;
