const $buttons = document.querySelectorAll(".button");
const $restoreBtn = document.querySelector(".restore");
const $copyBtn = document.querySelector(".copy");
const $display = document.querySelector(".display");
const $formula = $display.querySelector(".formula");
const $result = $display.querySelector(".result");

const $logList = document.querySelector(".log-list");
const $logResetBtn = document.querySelector(".log-reset-btn");

let firstOperand = null;
let secondOperand = null;
let operator;
let prevResult = null;
let isOperatorActive = false; // 연산자 클릭 여부
let prevOperation = {
  formula: "",
  result: "",
};
let log = [];
let logIndex = 1;

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

function trimNumbers(number) {
  if (number > 9999999999) return "Too Big";

  let numStr = String(number);

  if (numStr.length > 11) {
    numStr = numStr.slice(0, 11);
  }

  return parseFloat(numStr);
}

function displayResult() {
  $result.textContent = trimNumbers(prevResult);
  firstOperand = prevResult ? prevResult : firstOperand;
  firstOperand = trimNumbers(firstOperand);
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

function restoreResult() {
  if (prevOperation.result === "") return;
  $formula.textContent = prevOperation.formula;
  $result.textContent = prevOperation.result;
  firstOperand = prevOperation.result;
  secondOperand = null;
  operator = null;
  isOperatorActive = true;
}

function createElement(tagName, className, textContent) {
  const $element = document.createElement(tagName);
  $element.className = className;
  $element.textContent = textContent;
  return $element;
}

function displayLog() {
  const $logItem = createElement("li", "log-item", "");
  const $logItemIndex = createElement(
    "span",
    "log-item__index",
    `Log#${logIndex++}`
  );
  const $logItemContent = createElement(
    "span",
    "log-item__content",
    `${prevOperation.formula} ${prevOperation.result}`
  );
  $logItem.append($logItemIndex, $logItemContent);
  $logList.append($logItem);
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
      prevOperation = {
        formula: $formula.textContent,
        result: $result.textContent,
      };
      operator = null;
      isOperatorActive = true;
      firstOperand = prevResult;
      displayLog();
      console.log(prevOperation);
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
$restoreBtn.addEventListener("click", restoreResult);

$buttons.forEach(($button) => {
  $button.addEventListener("click", (event) => {
    if ($button.classList.contains("number")) {
      handleNumber($button);
    } else if ($button.classList.contains("operator")) {
      handleOperate($button);
    } else if ($button.classList.contains("function")) {
      handleFunction($button);
    }
  });
});

$logResetBtn.addEventListener("click", () => {
  $logList.innerHTML = "";
  logIndex = 1;
});
