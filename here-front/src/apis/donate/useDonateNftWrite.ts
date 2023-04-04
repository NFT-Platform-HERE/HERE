import { NFT_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DonationNft } from "@/types/DonationNft";
import * as queryKeys from "@/constants/queryKeys";
import useExpUpdate from "../member/useExpUpdate";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

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
  const { mutate } = useExpUpdate();
  const { memberId } = useSelector((state: RootState) => state.member);

  return useMutation(fetcher, {
    onSuccess: (data) => {
      const payload = {
        memberId,
        exp: 10,
      };
      mutate(payload);
      return queryClient.invalidateQueries(queryKeys.DONATE_DETAIL);
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateNftWrite;
