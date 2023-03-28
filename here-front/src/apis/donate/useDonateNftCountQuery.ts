import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Iprops {
  senderId: number;
}

const fetcher = (senderId: number) =>
  axios.get(NFT_SERVER_URL + `/nft/count/${senderId}`).then(({ data }) => {
    const response = data.data;
    return response;
  });

const useDonateNftCountQuery = ({ senderId }: Iprops) => {
  return useQuery(
    [queryKeys.DONATE_NFT_COUNT, senderId],
    () => fetcher(senderId),
    {
      suspense: true,
    },
  );
  ``;
};

export default useDonateNftCountQuery;
