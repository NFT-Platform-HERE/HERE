import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Iprops {
  nickname: string;
  setNicknameMessage: (message: string) => void;
}

const fetcher = (nickname: string) =>
  axios
    .get(MEMBER_SERVER_URL + `/member/check/nickname/${nickname}`)
    .then(({ data }) => data);

const useCheckMemberNicknameQuery = ({
  nickname,
  setNicknameMessage,
}: Iprops) => {
  return useQuery(
    [queryKeys.MEMBER_NICKNAME_CHECK, nickname],
    () => fetcher(nickname),
    {
      enabled: !!nickname,
      onSuccess: (data) => {
        if (data.status === "HERE_DUPLICATED_NICKNAME") {
          // 중복인 경우
          setNicknameMessage("중복된 닉네임입니다");
        } else if (data.status === "HERE_NOT_DUPLICATED_NICKNAME") {
          // 중복 아닌 경우
          setNicknameMessage("");
        }
      },
      retry: false,
    },
  );
};

export default useCheckMemberNicknameQuery;
