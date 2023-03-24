import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import router from "next/router";
import { Signup } from "@/types/Signup";

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
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: () => {
      console.log("성공!");
      router.push("/");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useSignup;
