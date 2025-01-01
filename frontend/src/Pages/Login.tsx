import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Instance from "../../axios";
import { userActions } from "../redux/reducer/userSlice";

const Login: React.FC = () => {
  const [loginId, setLoginId] = useState<string>("");
  const [loginPw, setLoginPw] = useState<string>("");
  const nav = useNavigate();
  const dispath = useDispatch();

  const handelLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const reqData = { id: loginId, pw: loginPw }; // 입력된 ID와 PW를 요청 데이터로 구성
      const res = await Instance.post("/auth/login", reqData);
      const { accessToken } = res.data;
      dispath(userActions.setAccessToken(accessToken));
      // 메인 페이지로 이동
      nav("/");
    } catch (error: any) {
      console.error(
        "로그인 실패:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            로그인
          </h1>
        </div>
        <form method="POST" className="space-y-5" onSubmit={handelLogin}>
          <div className="mt-2">
            <input
              id="loginId"
              name="loginId"
              type="text"
              required
              autoComplete="loginId"
              value={loginId}
              placeholder="아이디"
              className="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <input
              id="loginPw"
              name="loginPw"
              type="password"
              required
              autoComplete="current-password"
              value={loginPw}
              placeholder="비밀번호"
              className="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              onChange={(e) => {
                setLoginPw(e.target.value);
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              로그인
            </button>
          </div>
        </form>

        <p className="flex justify-center gap-3 mt-5 text-center text-gray-500 text-sm/6">
          <Link
            to={"/"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            아이디 찾기
          </Link>
          |
          <Link
            to={"/"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            비밀번호 찾기
          </Link>
          |
          <Link
            to={"/join"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            회원가입
          </Link>
        </p>

        <div className="flex flex-col items-center mt-5">
          <button className="flex justify-center w-full px-4 py-2 text-sm font-semibold text-black bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500">
            카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
