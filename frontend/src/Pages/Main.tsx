import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리
import Instance, { refreshAccessToken } from "../../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userActions } from "../redux/reducer/userSlice";
interface DecodedToken {
  id: string;
  name: string;
}

const Main: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const dispath = useDispatch();
  const nav = useNavigate();

  const decodeToken = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decoded.id);
      setUserName(decoded.name);
    } catch (error) {
      console.error("Invalid token:", error);
      setUserId(null);
      setUserName(null);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        dispath(userActions.setAccessToken(newAccessToken));
      } else {
        nav("/login");
      }
    } catch (error) {
      console.error(`자동로그인 실패 ${error}`);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await Instance.post("/auth/logout", {
        withCredentials: true,
      });
      dispath(userActions.setAccessToken(null));
      setUserId(null);
      setUserName(null);
      alert(res.data.message);
    } catch (error) {
      console.error(`로그아웃 실패, ${error}`);
    }
  };

  useEffect(() => {
    if (accessToken) {
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
            <button onClick={handleLogout}>로그아웃</button> <br />
          </>
        ) : (
          <>
            <button onClick={handleAutoLogin}>로그인</button> <br />
            <button onClick={() => nav("/join")}>회원가입</button> <br />
          </>
        )}
        <button onClick={() => nav("/list")}>리스트</button> <br />
      </div>
    </div>
  );
};

export default Main;
