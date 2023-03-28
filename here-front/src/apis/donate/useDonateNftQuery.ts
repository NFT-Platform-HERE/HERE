import { NFT_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonationNft } from "@/types/DonationNft";

const fetcher = (payload: DonationNft) =>
  axios
    .patch(NFT_SERVER_URL + `/nft/donate`, {
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      quantity: payload.quantity,
    })
    .then(({ data }) => data);

const useDonateNftQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateNftQuery;
