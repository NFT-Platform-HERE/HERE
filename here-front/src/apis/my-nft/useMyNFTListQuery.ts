import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string) =>
  axios.get(NFT_SERVER_URL + `/nft/${memberId}`).then(({ data }) => data.data);

const useMyNFTListQuery = (memberId: string) => {
  return useQuery([queryKeys.MYNFT_LIST, memberId], () => fetcher(memberId), {
    enabled: !!memberId,
    onSuccess: (data) => {
      console.log("myNFT 성공", data);
    },
  });
};

export default useMyNFTListQuery;
