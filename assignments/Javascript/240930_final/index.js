const $buttons = document.querySelectorAll(".button");
const $copyBtn = document.querySelector(".copy");
const $display = document.querySelector(".display");
const $formula = $display.querySelector(".formula");
const $result = $display.querySelector(".result");

let firstOperand = null;
let secondOperand = null;
let operator;
let prevResult = null;
let isOperatorActive = false; // 연산자 클릭 여부

/* 함수 */
function calculate(first, second, operator) {
  let result;

  switch (operator) {
    case "*":
      result = Number(first) * Number(second);
      break;
    case "+":
      result = Number(first) + Number(second);
      break;
    case "-":
      result = Number(first) - Number(second);
      break;
    case "/":
      result = Number(first) / Number(second);
      break;
  }

  return parseFloat(result.toFixed(10));
}

function displayResult() {
  $result.textContent = prevResult;
  firstOperand = prevResult ? prevResult : firstOperand;
  $result.textContent = firstOperand;
  secondOperand = null;
  // console.log(firstOperand, operator, secondOperand);
}

function displayFormula($button) {
  if ($button.textContent === "=") {
    $formula.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
  } else {
    $formula.textContent = `${firstOperand} ${operator}`;
  }
}

async function copyResult() {
  try {
    await navigator.clipboard.writeText($result.textContent);
    alert("디스플레이 화면의 숫자가 클립보드에 복사되었습니다.");
  } catch (error) {
    console.log(error);
  }
}

/* 핸들러 */
function handleOperate($button) {
  // 소수점 버튼 클릭시
  if ($button.textContent === ".") {
    if (isOperatorActive) {
      $result.textContent = "0.";
    } else {
      // 디스플레이에 이미 소수점이 있으면 입력 무시하기
      if ($result.textContent.includes(".")) return;
      $result.textContent += ".";
    }
  } else {
    // = 버튼 클릭시
    if ($button.textContent === "=") {
      if (operator === null || firstOperand === null) return;
      secondOperand = $result.textContent;
      displayFormula($button);
      prevResult = calculate(firstOperand, secondOperand, operator);
      displayResult();
      operator = null;
      isOperatorActive = true;
      firstOperand = prevResult;
    }
    // 산술연산자 클릭시
    else {
      if (firstOperand === null) {
        firstOperand = $result.textContent;
      } else if (!isOperatorActive) {
        secondOperand = $result.textContent;
        prevResult = calculate(firstOperand, secondOperand, operator);
        displayResult();
        firstOperand = prevResult;
      }
      operator = $button.textContent;
      displayFormula($button);
      isOperatorActive = true;
      console.log(`First Operand: ${firstOperand}`);
      console.log(`Operator: ${operator}`);
    }
  }
}

function handleFunction($button) {
  // Clear 기능 추가하기
  if ($button.textContent === "C") {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    $formula.textContent = "";
    $result.textContent = "0";
  }
  // % 기능 추가하기
  else if ($button.textContent === "%") {
    $result.textContent = String(Number($result.textContent * 0.01));
    // console.log(firstOperand, operator, secondOperand);
    firstOperand = $result.textContent;
    isOperatorActive = true;
  }
  // ± 기능 추가하기
  else if ($button.textContent === "±") {
    if (isOperatorActive) {
      $result.textContent = String(Number($result.textContent) * -1);
      firstOperand = $result.textContent;
    } else {
      $result.textContent = String(Number($result.textContent) * -1);
      secondOperand = $result.textContent;
    }
  }
}

function handleNumber($button) {
  if (isOperatorActive) {
    if ($result.textContent === "0.") {
      $result.textContent += $button.textContent;
    } else {
      $result.textContent = $button.textContent;
    }
    isOperatorActive = false;
  } else {
    if ($result.textContent === "0") {
      $result.textContent = $button.textContent;
    } else {
      $result.textContent += $button.textContent;
    }
  }
}

$copyBtn.addEventListener("click", copyResult);

$buttons.forEach(($button) => {
  $button.addEventListener("click", (event) => {
    // (화면 기준) 글자 23개 이상이면 이후 입력 무시하기
    if ($result.textContent.length >= 20) return;

    if ($button.classList.contains("number")) {
      handleNumber($button);
    } else if ($button.classList.contains("operator")) {
      handleOperate($button);
    } else if ($button.classList.contains("function")) {
      handleFunction($button);
    }
  });
});
