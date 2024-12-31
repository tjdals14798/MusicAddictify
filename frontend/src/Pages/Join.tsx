import { FormEvent, useState } from "react";
import Instance from "../../axios";
import dayjs from "dayjs";

const Join: React.FC = () => {
  const [joinId, setJoinId] = useState<string>("");
  const [joinPw, setJoinPw] = useState<string>("");
  const [joinName, setJoinName] = useState<string>("");
  const [joinBirthDate, setJoinBirthDate] = useState<string>("");

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();

    // YYYYMMDD 유효성 검사
    const dateRegex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(joinBirthDate)) {
      alert("생년월일은 YYYYMMDD 형식으로 입력해주세요 (예: 19991116)");
      return;
    }

    try {
      const reqData = {
        id: joinId,
        pw: joinPw,
        name: joinName,
        birthDate: dayjs(joinBirthDate, "YYYYMMDD").format("YYYY-MM-DD"),
      };

      const res = await Instance.post("/auth/register", reqData);

      console.log(res.data);
      alert(
        `가입 성공!\n아이디: ${joinId}\n이름: ${joinName}\n생년월일: ${joinBirthDate}`
      );
    } catch (error: any) {
      console.error("회원가입 실패", error.response?.data || error.message);
      alert(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="py-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            회원가입
          </h1>
        </div>
        <form method="POST" className="space-y-6" onSubmit={handleJoin}>
          <div className="mt-2">
            <input
              id="joinId"
              name="joinId"
              type="text"
              required
              autoComplete="username"
              placeholder="아이디"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm rounded-t-md"
            />
            <input
              id="joinPw"
              name="joinPw"
              type="password"
              required
              autoComplete="current-password"
              placeholder="비밀번호"
              value={joinPw}
              onChange={(e) => {
                setJoinPw(e.target.value);
              }}
              className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm border-t-0 rounded-b-md"
            />
          </div>

          <div className="mt-2">
            <input
              id="joinName"
              name="joinName"
              type="text"
              required
              autoComplete="name"
              placeholder="이름"
              value={joinName}
              onChange={(e) => {
                setJoinName(e.target.value);
              }}
              className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm rounded-t-md"
            />
            <input
              id="JoinDate"
              name="JoinDate"
              type="text"
              maxLength={8}
              required
              placeholder="생년월일 8자리"
              value={joinBirthDate}
              onChange={(e) => {
                setJoinBirthDate(e.target.value);
              }}
              className="block w-full h-12 px-3 py-2 text-base text-gray-900 placeholder-gray-400 border border-gray-300 focus:z-10 focus:outline-indigo-600 focus:ring-indigo-600 sm:text-sm border-t-0 rounded-b-md"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
