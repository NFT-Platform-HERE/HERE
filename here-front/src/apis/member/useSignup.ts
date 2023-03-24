import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import router, { useRouter } from "next/router";
import { Signup } from "@/types/Signup";
import { useDispatch } from "react-redux";
import { getMemberInfo } from "@/stores/member/member";

const fetcher = (payload: Signup) =>
  axios
    .post(MEMBER_SERVER_URL + `/member/signup`, {
      walletAddress: payload.walletAddress,
      name: payload.name,
      nickname: payload.nickname,
      email: payload.email,
      characterId: payload.characterId,
    })
    .then(({ data }) => data);

const useSignup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
      dispatch(getMemberInfo(data.data));
      router.push("/");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useSignup;
