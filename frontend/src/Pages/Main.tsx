import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // 쿠키 처리 라이브러리
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // jwt-decode 라이브러리
import Instance from "../../axios";

interface DecodedToken {
  id: string;
  name: string; // JWT에 포함된 사용자 이름
  exp: number; // 토큰 만료 시간 (있을 경우)
}

const Main: React.FC = () => {
  const nav = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("jwt"); // 쿠키에서 JWT 가져오기
    console.log("token", token);
    if (token) {
      console.log("true");
      try {
        // JWT 디코딩
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decoded.id);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Invalid JWT Token", error);
        setUserId(null);
        setUserName(null);
      }
    }
  }, []);

  // 리프레시 토큰 요청 함수
  // const refreshAccessToken = async () => {
  //   try {
  //     const response = await Instance.get("/auth/refresh", {
  //       withCredentials: true, // 쿠키 포함
  //     });

  //     console.log("새로운 액세스 토큰:", response.data.accessToken);
  //     Cookies.set("jwt", response.data.accessToken); // 새로운 JWT 저장
  //     return response.data.accessToken;
  //   } catch (error) {
  //     console.error("리프레시 토큰 요청 중 오류 발생:", error);
  //     return null;
  //   }
  // };

  // JWT 토큰을 확인하고 사용자 정보를 설정
  // useEffect(() => {
  //   const checkAndSetUser = async () => {
  //     let token = Cookies.get("jwt");
  //     console.log("JWT Token:", token);

  //     if (token) {
  //       console.log('true')
  //       try {
  //         // JWT 디코딩
  //         const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  //         setUserId(decoded.id);
  //         setUserName(decoded.name);
  //       } catch (error) {
  //         console.error("Invalid JWT Token", error);
  //         setUserId(null);
  //         setUserName(null);
  //       }
  //     }

  //     // if (!token) {
  //     //   // JWT 토큰이 없을 경우 리프레시 토큰 요청
  //     //   console.warn("토큰 없음, 리프레시 시도");
  //     //   token = await refreshAccessToken();
  //     //   if (!token) {
  //     //     console.error("리프레시 토큰으로도 액세스 토큰을 갱신하지 못함");
  //     //     setUserId(null);
  //     //     setUserName(null);
  //     //     return;
  //     //   }
  //     // }

  //     // try {
  //     //   // JWT 디코딩
  //     //   const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
  //     //   console.log(decoded);

  //     //   // 토큰 만료 확인
  //     //   if (decoded.exp && Date.now() >= decoded.exp * 1000) {
  //     //     console.warn("Token expired, 리프레시 시도");
  //     //     const newAccessToken = await refreshAccessToken();
  //     //     if (!newAccessToken) {
  //     //       setUserId(null);
  //     //       setUserName(null);
  //     //       Cookies.remove("jwt");
  //     //       return;
  //     //     }

  //     //     // 새로운 토큰을 기반으로 사용자 정보 업데이트
  //     //     const newDecoded: DecodedToken = jwtDecode<DecodedToken>(newAccessToken);
  //     //     setUserId(newDecoded.id);
  //     //     setUserName(newDecoded.name);
  //     //   } else {
  //     //     // 사용자 정보 설정
  //     //     setUserId(decoded.id);
  //     //     setUserName(decoded.name);
  //     //   }
  //     // } catch (error) {
  //     //   console.error("Invalid token:", error);
  //     //   setUserId(null);
  //     //   setUserName(null);
  //     //   Cookies.remove("jwt");
  //     // }
  //   };

  //   checkAndSetUser();
  // }, []);

  return (
    <div className="bg-blue-500 text-white text-center p-10 rounded-lg">
      {userName ? (
        <div>
          환영합니다, {userId}, {userName}님!
        </div>
      ) : (
        <div>로그인 후 이름이 표시됩니다.</div>
      )}
      <div>
        {userName ? (
          <>
            <button
              onClick={() => {
                Cookies.remove("jwt"); // 쿠키 삭제
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
