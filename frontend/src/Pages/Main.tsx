import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="bg-blue-500 text-white text-center p-10 rounded-lg">
      Tailwind CSS 작동 중!
      <div>
        <button onClick={() => nav("/login")}>로그인</button> <br />
        <button onClick={() => nav("/join")}>회원가입</button> <br />
        <button onClick={() => nav("/list")}>리스트</button> <br />
      </div>
    </div>
  );
};

export default Main;
