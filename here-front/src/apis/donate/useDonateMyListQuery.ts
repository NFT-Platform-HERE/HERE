import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { Donation } from "./../../types/Donation";

const fetcher = (memberId: string) =>
  axios
    .get(DONATE_SERVER_URL + `/board/member/${memberId}`)
    .then(({ data }) => {
      const response = data.data as Donation[];
      return response;
    });

const useDonateMyListQuery = (memberId: string) => {
  return useQuery(
    [queryKeys.DONATE_MY_LIST, memberId],
    () => fetcher(memberId),
    {
      suspense: true,
      enabled: !!memberId,
    },
  );
};

export default useDonateMyListQuery;
