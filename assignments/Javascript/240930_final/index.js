const $buttons = document.querySelectorAll(".button");
const $display = document.querySelector(".display");
const $result = $display.querySelector(".result");

let displayValue = 0;

$buttons.forEach(($button) => {
  $button.addEventListener("click", () => {
    // console에 각 버튼의 value 출력하기
    console.log($button.textContent);

    // (화면 기준) 글자 23개 이상이면 이후 입력 무시하기
    if ($result.textContent.length >= 20) return;

    // 숫자를 디스플레이에 표시하기
    if ($button.className.includes("number")) {
      if ($result.textContent === "0") {
        $result.textContent = $button.textContent;
      } else {
        $result.textContent += $button.textContent;
      }
    }
    // 소수점 버튼 추가하기
    if ($button.textContent === ".") {
      if (!$result.textContent.includes(".")) {
        $result.textContent += ".";
      }
    }

    // Clear 기능 추가하기
    if ($button.textContent === "C") {
      $result.textContent = "0";
    }
  });
});
