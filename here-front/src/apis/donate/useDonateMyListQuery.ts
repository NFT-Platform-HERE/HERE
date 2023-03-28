import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { Donation } from "./../../types/Donation";

interface Iprops {
  memberId: string;
}

const fetcher = (memberId: string) =>
  axios
    .get(DONATE_SERVER_URL + `/board/member/${memberId}`)
    .then(({ data }) => {
      const response = data.data as Donation[];
      return response;
    });

const useDonateMyListQuery = ({ memberId }: Iprops) => {
  return useQuery(queryKeys.DONATE_MY_LIST, () => fetcher(memberId), {
    suspense: true,
  });
};

export default useDonateMyListQuery;
