import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Iprops {
  email: string;
  setEmailMessage: (message: string) => void;
}

const fetcher = (email: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/check/email/${email}`)
    .then(({ data }) => data);

const useCheckMemberEmailQuery = ({ email, setEmailMessage }: Iprops) => {
  return useQuery([queryKeys.MEMBER_EMAIL_CHECK, email], () => fetcher(email), {
    enabled: !!email,
    onSuccess: (data) => {
      console.log(data);
      // 이 부분 백엔드가 메시지 바꿔줘야함
      if (data.status === "HERE_DUPLICATED_EMAIL") {
        // 이메일 중복
        setEmailMessage("중복된 이메일입니다");
      } else if (data.status === "HERE_NOT_DUPLICATED_EMAIL") {
        // 이메일 중복 아님
        setEmailMessage("");
      }
    },
    onError: () => {
      setEmailMessage("유효하지 않은 이메일입니다");
    },
    onSettled: () => {
      console.log("하하");
    },
    retry: false,
  });
};

export default useCheckMemberEmailQuery;
