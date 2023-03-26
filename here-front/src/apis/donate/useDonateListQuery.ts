import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios.get(MEMBER_SERVER_URL + `/board`).then(({ data }) => data.data);

const useDonateListQuery = () => {
  return useQuery(queryKeys.DONATE_LIST, () => fetcher(), { suspense: true });
};

export default useDonateListQuery;
