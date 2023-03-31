import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (senderId: string) =>
  axios.get(NFT_SERVER_URL + `/nft/count/${senderId}`).then(({ data }) => {
    const response = data.data;
    return response;
  });

const useDonateNftCountQuery = (senderId: string) => {
  return useQuery(
    [queryKeys.DONATE_NFT_COUNT, senderId],
    () => fetcher(senderId),
    {
      enabled: !!senderId,
    },
  );
};

export default useDonateNftCountQuery;
