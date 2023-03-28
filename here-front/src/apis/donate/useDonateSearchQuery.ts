import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { Donation } from "./../../types/Donation";

interface Iprops {
  search: string;
}

const fetcher = (search: string) =>
  axios
    .get(DONATE_SERVER_URL + `/board/search`, {
      params: {
        query: search,
      },
    })
    .then(({ data }) => {
      const response = data.data as Donation[];
      return response;
    });

const useDonateSearchQuery = ({ search }: Iprops) => {
  return useQuery(queryKeys.DONATE_SEARCH, () => fetcher(search), {
    suspense: true,
  });
};

export default useDonateSearchQuery;
