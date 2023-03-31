import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (search: string, pageParam: number) =>
  axios
    .get(DONATE_SERVER_URL + `/board/search`, {
      params: {
        query: search,
        page: pageParam,
      },
    })
    .then(({ data }) => {
      return data.data;
    });

const useDonateSearchQuery = (search: string) => {
  return useInfiniteQuery(
    [queryKeys.DONATE_SEARCH, search],
    ({ pageParam = 0 }) => fetcher(search, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      enabled: !!search,
    },
  );
};

export default useDonateSearchQuery;
