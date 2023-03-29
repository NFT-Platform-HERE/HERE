import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { MemberInfo } from "@/types/MemberInfo";

const fetcher = (memberId: string) =>
  axios.get(MEMBER_SERVER_URL + `/member/${memberId}`).then(({ data }) => {
    const response = data.data as MemberInfo;
    return response;
  });

const useMemberInfoQuery = (memberId: string) => {
  return useQuery([queryKeys.MEMBER_INFO, memberId], () => fetcher(memberId), {
    enabled: !!memberId,
  });
};

export default useMemberInfoQuery;
