import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (organType: string, query: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/search/organ/${organType}`, {
      params: { query: query },
    })
    .then(({ data }) => data);

const useSearchQuery = (organType: string, query: string) => {
  return useQuery(
    [queryKeys.SUBMIT_SEARCH, query],
    () => fetcher(organType, query),
    {
      onSuccess: (data) => {
        console.log(organType, "이름으로 검색", data);
      },
    },
  );
};

export default useSearchQuery;
