import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string, pageParam: number) =>
  axios
    .get(DONATE_SERVER_URL + `/board/member/${memberId}`, {
      params: {
        page: pageParam,
      },
    })
    .then(({ data }) => {
      return data.data;
    });

const useDonateMyListQuery = (memberId: string) => {
  return useInfiniteQuery(
    [queryKeys.DONATE_MY_LIST, memberId],
    ({ pageParam = 0 }) => fetcher(memberId, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      enabled: !!memberId,
    },
  );
};

export default useDonateMyListQuery;
