import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  axios
    .get(MEMBER_SERVER_URL + `/board/deadline`)
    .then(({ data }) => data.data);

const useDonateDeadLineListQuery = () => {
  return useQuery(queryKeys.DONATE_DEADLINE_LIST, () => fetcher(), {
    suspense: true,
  });
};

export default useDonateDeadLineListQuery;
