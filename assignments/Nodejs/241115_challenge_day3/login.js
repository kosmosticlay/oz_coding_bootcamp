const form = document.querySelector("form");
const idInput = document.querySelector("#user_id");
const passwordInput = document.querySelector("#user_pw");

const loginButton = document.querySelector("#login_btn");
const logoutButton = document.querySelector("#logout_btn");

const main = document.querySelector("main");
const userName = document.querySelector("#user_name");
const userDetail = document.querySelector("#user_info");

axios.defaults.withCredentials = true;

// form의 기본 submit 값 초기화
form.addEventListener("submit", (e) => e.preventDefault());

// 로그인 함수
function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  return axios.post("http://localhost:3000", { userId, userPassword });
}

// 로그아웃 함수
function logout() {
  return axios.delete("http://localhost:3000");
}

// 유저 정보를 받아오는 함수
function getUserInfo() {
  return axios.get("http://localhost:3000");
}

// 유저 정보를 렌더링 시키는 함수
function renderUserInfo(userInfo) {
  main.style.display = "block";
  form.style.display = "none";
  userName.textContent = userInfo.user_name;
  userDetail.textContent = userInfo.user_info;
}

// 유저 정보를 숨기는 함수
function renderLoginForm() {
  main.style.display = "none";
  form.style.display = "block";
  userName.textContent = "";
  userDetail.textContent = "";
}

// 로그인 버튼을 클릭하는 경우 post 요청 보낸 후 get 요청
loginButton.onclick = () => {
  login()
    .then(() => getUserInfo())
    .then((res) => renderUserInfo(res.data));
};

// 로그아웃 버튼을 클릭하는 경우
logoutButton.onclick = () => {
  logout().then((res) => {
    console.log(res);
    renderLoginForm();
  });
};
