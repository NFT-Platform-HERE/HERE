import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  getAgencyId,
  getHospitalId,
  getMemberInfo,
} from "@/stores/member/member";

const fetcher = (walletAddress: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/find/${walletAddress}`)
    .then(({ data }) => data);

const useCheckMemberQuery = (walletAddress: string) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useQuery(
    [queryKeys.MEMBER_CHECK, walletAddress],
    () => fetcher(walletAddress),
    {
      enabled: !!walletAddress,
      onSuccess: (data) => {
        console.log(data.data);
        if (data.status === "HERE_NOT_SUCCESS_FIND_MEMBER") {
          router.push("/member");
          return;
        }
        if (data.data.role === "AGENCY") {
          dispatch(getAgencyId(data.data));
          router.push("/organization");
          return;
        }
        if (data.data.role === "HOSPITAL") {
          dispatch(getHospitalId(data.data));
          router.push("/organization");
          return;
        }
        if (data.data.role === "REDCROSS") {
          router.push("/redcross");
        }
        // 멤버ID, 닉네임, 이미지 받아서 저장
        dispatch(getMemberInfo(data.data));
      },
    },
  );
};

export default useCheckMemberQuery;
