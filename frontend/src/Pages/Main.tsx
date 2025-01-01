import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // 쿠키 처리 라이브러리
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리
import Instance from "../../axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
interface DecodedToken {
  id: string;
  name: string;
  exp: number; // 토큰 만료 시간
}

const Main: React.FC = () => {
  const nav = useNavigate();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const decodeToken = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      console.log(decoded.exp);
      setUserId(decoded.id);
      setUserName(decoded.name);
    } catch (error) {
      console.error("Invalid token:", error);
      setUserId(null);
      setUserName(null);
    }
  };

  useEffect(() => {
    if (accessToken) {
      console.log("현재 Access Token:", accessToken);
      decodeToken(accessToken); // 초기 Access Token 디코딩
    }
  }, [accessToken]);

  return (
    <div className="bg-blue-500 text-white text-center p-10 rounded-lg">
      {accessToken ? (
        <div>
          환영합니다, {userId}, {userName}님!
        </div>
      ) : (
        <div>로그인 후 이름이 표시됩니다.</div>
      )}
      <div>
        {accessToken ? (
          <>
            <button
              onClick={() => {
                setUserId(null);
                setUserName(null); // 상태 초기화
              }}
            >
              로그아웃
            </button>{" "}
            <br />
          </>
        ) : (
          <>
            <button onClick={() => nav("/login")}>로그인</button> <br />
            <button onClick={() => nav("/join")}>회원가입</button> <br />
          </>
        )}
        <button onClick={() => nav("/list")}>리스트</button> <br />
      </div>
    </div>
  );
};

export default Main;
