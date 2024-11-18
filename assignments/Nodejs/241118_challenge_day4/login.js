const form = document.querySelector("form");
const idInput = document.querySelector("#user_id");
const passwordInput = document.querySelector("#user_password");
const loginButton = document.querySelector("#login_button");

const main = document.querySelector("main");
const userName = document.querySelector("#user_name");
const userInfo = document.querySelector("#user_info");
const logoutButton = document.querySelector("#logout_button");

axios.defaults.withCredentials = true;
// 전역에서 관리
let accessToken = "";

form.addEventListener("submit", (e) => e.preventDefault());

function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  return (
    // 유저 아이디와 비밀번호를 담아 서버에 post 요청
    axios
      .post("http://localhost:3000", { userId, userPassword })
      // 받은 엑세스 토큰을 변수에 저장
      .then((res) => (accessToken = res.data))
  );
}

function logout() {
  accessToken = "";
}

function getUserInfo() {
  return axios.get("http://localhost:3000", {
    // header에 토큰을 넣어서 전송
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

function renderUserInfo(user) {
  main.style.display = "block";
  form.style.display = "none";
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}

function renderLoginForm() {
  main.style.display = "none";
  form.style.display = "grid"; // UI 변경
  userName.textContent = "";
  userInfo.textContent = "";
}

loginButton.onclick = () => {
  login() // post 요청
    // 응답으로 받은 엑세스 토큰 (엑세스 토큰은 자동으로 헤더에 담겨서 요청이 전송됨..)
    .then(() => getUserInfo()) // get 요청
    .then((res) => renderUserInfo(res.data));
};

logoutButton.onclick = () => {
  logout();
  renderLoginForm();
};
