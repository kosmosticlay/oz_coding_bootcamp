import { useEffect, useState } from "react";
import axios from "axios";

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (provider) => {
    let authUrl;

    switch (provider) {
      case "kakao":
        authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
        break;
      case "naver":
        // 네이버 로그인 URL 설정
        break;
      case "google":
        // 구글 로그인 URL 설정
        break;
      default:
        return;
    }

    window.location.href = authUrl;
  };

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청
      await axios.post(
        "https://kapi.kakao.com/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 로컬 상태 초기화
      setIsLoggedIn(false);
      setCurrentUser(null);
      setAuthProvider(null);
      setAccessToken(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // 로그인 화면에 provider 표시를 위한 맵핑 객체
  const providerMapping = {
    kakao: "카카오",
    naver: "네이버",
    google: "구글",
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");

      if (authorizationCode) {
        try {
          // 서버에 접근 토큰 요청해서 response.data로 받기
          const response = await axios.post(
            "http://localhost:4000/kakao/login",
            { authorizationCode }
          );
          console.log("서버 응답(접근 토큰) :", response.data);
          setIsLoggedIn(true);

          // 전달받은 접근 토큰과 함께 서버에 사용자 정보 요청하기
          setAccessToken(response.data);

          const userInfoResponse = await axios.post(
            "http://localhost:4000/kakao/userinfo",
            { accessToken: response.data }
          );
          console.log("사용자 정보:", userInfoResponse.data);
          console.log(
            "사용자 정보:",
            providerMapping[userInfoResponse.provider]
          );
          setCurrentUser(userInfoResponse.data);
          // provider에 따른 텍스트 설정
          setAuthProvider(providerMapping[userInfoResponse.provider]);
        } catch (error) {
          console.log("에러:", error);
        }
      }
    };

    console.log(
      "REST API KEY :",
      REST_API_KEY,
      "/ REDIRECT URI: ",
      REDIRECT_URI
    );

    fetchData();
  }, []);
  return (
    <>
      <h1 className="my-10 text-3xl font-semibold text-center text-purple-700">
        OAuth 실습
      </h1>
      {isLoggedIn && currentUser ? (
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <h1>{currentUser.properties.nickname}</h1>
          <img
            className="rounded-full"
            src={currentUser.properties.thumbnail_image}
          />
          <p>{`${authProvider}로 로그인 하였습니다`}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <ul className="grid w-full grid-cols-3">
          <li className="login-btn-container">
            <button onClick={() => handleLogin("kakao")} className="login-btn">
              카카오 로그인
            </button>
          </li>
          <li className="login-btn-container">
            <button onClick={() => handleLogin("naver")} className="login-btn">
              네이버 로그인
            </button>
          </li>
          <li className="login-btn-container">
            <button onClick={() => handleLogin("google")} className="login-btn">
              구글 로그인
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default App;
