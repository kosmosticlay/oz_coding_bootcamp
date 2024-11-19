import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import axios from "axios";

dotenv.config();

const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;

const app = express();
const port = 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["OPTIONS", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.post("/kakao/login", async (req, res) => {
  const authorizationCode = req.body.authorizationCode;

  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorizationCode,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    res.send(response.data.access_token); // 접근 토큰
  } catch (error) {
    console.error("토큰 요청 실패: ", error);
    res.status(500).send(error);
  }
});

app.post("/kakao/userinfo", async (req, res) => {
  const { accessToken } = req.body;

  try {
    const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    // 로그인 화면에 provider표시를 위한 데이터 변환
    const userData = {
      ...response.data,
      provider: "kakao", // 응답 정보(사용자 정보)에 provider 정보 추가
    };

    res.send(userData);
  } catch (error) {
    console.error("토큰 요청 실패:", error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`${port}번 포트에 서버가 열렸어요!`);
});
