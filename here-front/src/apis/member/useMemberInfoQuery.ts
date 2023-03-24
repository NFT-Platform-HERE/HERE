import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: number) =>
  axios.get(MEMBER_SERVER_URL + `/member/${memberId}`).then(({ data }) => data);

const useMemberInfoQuery = (memberId: number) => {
  return useQuery(queryKeys.MEMBER_INFO, () => fetcher(memberId));
};

export default useMemberInfoQuery;
