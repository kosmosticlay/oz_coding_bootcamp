// const API_URL = "https://dog.ceo/api/breeds/image/random";
// const pushBtn = document.getElementById("push-btn");
// const request = new XMLHttpRequest();

// pushBtn.addEventListener("click", function () {
//   request.open("get", API_URL); // 해당 URL로 GET 요청을 준비
//   request.addEventListener("load", function () {
//     const newDog = JSON.parse(request.response);
//     const dogImg = document.querySelector("img");
//     dogImg.src = newDog.message;
//   });

//   request.send(); // 요청을 서버로 전달
// });

const MULTIPLE_API_URL = "https://dog.ceo/api/breeds/image/random/42";
const BREEDS_API_URL = "https://dog.ceo/api/breeds/list/all";

const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const $header = document.querySelector("header");
const $main = document.querySelector("main");
const $input = document.getElementById("filter-text");
const $button = document.getElementById("filter-button");
const $select = document.getElementById("filter-select");
const $more = document.getElementById("more");
const $tothetop = document.getElementById("tothetop");
const $reset = document.getElementById("reset");

const currentDogs = [];

function getDogs() {
  request1.open("get", MULTIPLE_API_URL);
  // 이벤트리스너 등록하지 않고 onload로 한번만 실행되게 할 수 있다!
  request1.onload = function () {
    const response = JSON.parse(request1.response);
    response.message.forEach((item) => {
      currentDogs.push(item);
      displayDogs(item);
    });
  };
  request1.send();
}

function displayDogs(item) {
  const $dogImgDiv = document.createElement("div");
  $dogImgDiv.classList.add("flex-item");
  $dogImgDiv.innerHTML = `
    <img src="${item}" alt="dog" />`;
  $main.appendChild($dogImgDiv);
}

// 웹 페이지가 최초 로딩되었을 때 실행
window.addEventListener("load", function () {
  getDogs();

  // 셀렉트에 견종 정보 뿌리기
  request2.open("get", BREEDS_API_URL);
  request2.addEventListener("load", function () {
    const response = JSON.parse(request2.response);
    Object.keys(response.message).forEach((breed) => {
      const $option = document.createElement("option");
      $option.value = breed;
      $option.textContent = breed;
      $select.appendChild($option);
    });
  });
  request2.send();
});

$button.addEventListener("click", function () {
  $main.innerHTML = "";
  let filteredDogs = currentDogs.filter((item) => {
    return item.indexOf($input.value) !== -1;
  });

  $input.value = "";

  filteredDogs.forEach((item) => {
    displayDogs(item);
  });
});

$select.addEventListener("change", function () {
  $main.innerHTML = "";
  let filteredDogs = currentDogs.filter((item) => {
    return item.indexOf($select.value) !== -1;
  });

  filteredDogs.forEach((item) => {
    displayDogs(item);
  });
});

$more.addEventListener("click", function () {
  request1.open("get", MULTIPLE_API_URL);
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response);
    response.message.forEach((item) => {
      currentDogs.push(item);
      displayDogs(item);
    });
  });
  request1.send();
});

$tothetop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$reset.addEventListener("click", function () {
  $main.innerHTML = "";
  currentDogs.length = 0;
  getDogs();
});
