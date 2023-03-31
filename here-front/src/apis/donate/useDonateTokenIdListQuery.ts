import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string, count: number) =>
  axios
    .get(NFT_SERVER_URL + `/nft/${memberId}/hospital/${count}`)
    .then(({ data }) => data);

const useDonateTokenIdListQuery = (memberId: string, count: number) => {
  return useQuery(
    [queryKeys.DONATE_TOKEN_ID_LIST],
    () => fetcher(memberId, count),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        console.log("data!", data);
      },
      onError: (err) => {
        console.log("error!", err);
      },
    },
  );
};

export default useDonateTokenIdListQuery;
