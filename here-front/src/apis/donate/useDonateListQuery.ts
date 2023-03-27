import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { Donation } from "./../../types/Donation";

const fetcher = () =>
  axios.get(DONATE_SERVER_URL + `/board`).then(({data}) => {
    const response = data.data as Donation[];
    return response;
  });

const useDonateListQuery = () => {
  return useQuery(queryKeys.DONATE_LIST, () => fetcher(), { suspense: true });
};

export default useDonateListQuery;
