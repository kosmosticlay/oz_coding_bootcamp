const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.text());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

let data = { message: "여러분 화이팅!" };

app.get("/", (req, res) => {
  res.json(data);
});

app.post("/", (req, res) => {
  data.message = req.body;
  res.send(req.body);
});

app.put("/", (req, res) => {
  data.message = req.body;
  res.send(req.body);
});

app.delete("/", (req, res) => {
  if (!data.message) {
    res.json({ message: "삭제할 메시지가 없습니다." });
  } else {
    data = {};
    res.json({ message: "메시지가 삭제되었습니다." });
  }
});

app.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다");
});
