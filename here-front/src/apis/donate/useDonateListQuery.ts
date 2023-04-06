import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (pageParam: number) =>
  axios
    .get(DONATE_SERVER_URL + `/board`, {
      params: {
        page: pageParam,
      },
    })
    .then(({ data }) => {
      return data.data;
    });

const useDonateListQuery = () => {
  return useInfiniteQuery(
    queryKeys.DONATE_LIST,
    ({ pageParam = 0 }) => fetcher(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
    },
  );
};

export default useDonateListQuery;
