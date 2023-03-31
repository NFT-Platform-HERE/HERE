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
      console.log("fetcher", data.data);
      return data.data;
    });

const useDonateListQuery = () => {
  return useInfiniteQuery(
    queryKeys.DONATE_LIST,
    ({ pageParam = 0 }) => fetcher(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        console.log("lastPage", lastPage);
        console.log("pages", pages);
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      onSuccess: (data) => {
        console.log("성공", data);
      },
      onError: () => {
        console.log("실패");
      },
    },
  );
};

export default useDonateListQuery;
