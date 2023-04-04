import { MEMBER_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Signup } from "@/types/Signup";
import { useDispatch } from "react-redux";
import { getMemberInfo } from "@/stores/member/member";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(getMemberInfo(data.data));
      MySwal.fire({
        icon: "success",
        title: "회원가입이 완료되었습니다",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: "text-20 font-medium",
          popup: "w-440 h-260",
        },
      }).then(() => {
        router.push("/");
      });
    },
    onError: () => {
      MySwal.fire({
        icon: "error",
        title: "회원가입에 실패하였습니다",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: "text-20 font-medium",
          popup: "w-440 h-260",
        },
      }).then(() => {
        router.push("/member");
      });
    },
  });
};

export default useSignup;
