const $buttons = document.querySelectorAll(".button");
const $restoreBtn = document.querySelector(".restore");
const $copyBtn = document.querySelector(".copy");
const $display = document.querySelector(".display");
const $formula = $display.querySelector(".formula");
const $result = $display.querySelector(".result");

const $logList = document.querySelector(".log-list");
const $logResetBtn = document.querySelector(".log-reset-btn");

let firstOperand = 0; // 첫번째 피연산자
let secondOperand; // 두번쨰 피연산자
let operator; // 현재 선택된 연산자
let resultValue; // 연산 결과 값
let isInitialized = false; // (로그 중복 기록 방지를 위한) 초기화 여부
let isCalculating = false; // 연산자 누른 직후인지 여부
let display = {
  formula: "",
  result: "",
}; // 디스플레이에 출력될 연산식

let log = [];
let logIndex = 1;

/* Header Button Event Handlers */
async function handleCopy() {
  try {
    await navigator.clipboard.writeText($result.textContent);
    alert("디스플레이 화면의 숫자가 클립보드에 복사되었습니다.");
  } catch (error) {
    console.log(error);
  }
}

function handleRestore() {
  displayFormula();
  displayResult();
  firstOperand = display.result;
  isInitialized = false;
  adjustFontSize();
}

/* Calculator Functions */
function adjustFontSize() {
  const textLength = $result.textContent.length;

  if (textLength <= 11) {
    $result.style.fontSize = "2.5rem";
  } else {
    const fontSize = Math.max(2.5 - (textLength - 11) * 0.2, 1.8);
    $result.style.fontSize = `${fontSize}rem`;
  }
}

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

function toggleSign() {
  const text = $result.textContent;

  if (text !== "" && text !== "0") {
    $result.textContent = Number(text) * -1;
  }
}

function displayFormula() {
  $formula.textContent = display.formula;
}

function displayResult() {
  if (Math.abs(display.result) < 1e-10) {
    $result.textContent = Number(display.result).toExponential();
  } else {
    $result.textContent = display.result;
  }
}

function createLogEl(tagName, className, textContent) {
  const $element = document.createElement(tagName);
  $element.className = className;
  $element.textContent = textContent;
  return $element;
}

function displayLog() {
  if (isInitialized) {
    return;
  } else {
    const $logItem = createLogEl("li", "log-item", "");

    const $logItemIndex = createLogEl(
      "span",
      "log-item__index",
      `Log ${logIndex++}`
    );

    const $logItemContent = createLogEl(
      "span",
      "log-item__content",
      `${display.formula} ${display.result}`
    );

    const $logDeleteBtn = document.createElement("span");
    $logDeleteBtn.className = "log-item__deleteBtn";

    const deleteIconSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    deleteIconSVG.setAttribute("viewBox", "0 0 448 512");
    deleteIconSVG.innerHTML =
      '<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>';
    $logDeleteBtn.appendChild(deleteIconSVG);

    $logDeleteBtn.addEventListener("click", () => {
      // 로그 아이템에 삭제 애니메이션 클래스 추가
      $logItem.classList.add("log-item--removing");

      // 애니메이션이 끝난 후 요소 삭제
      $logItem.addEventListener("transitionend", () => {
        $logItem.remove();
      });
    });

    $logDeleteBtn.addEventListener("mouseover", () => {
      const $logItemIndex = $logItem.querySelector(".log-item__index");
      $logItemIndex.style.backgroundColor = "#6a0000";
      $logItem.style.backgroundColor = "#ff0606";
    });

    $logDeleteBtn.addEventListener("mouseout", () => {
      $logItem.style.backgroundColor = ""; // 원래 배경색으로 복귀
      const $logItemIndex = $logItem.querySelector(".log-item__index");
      $logItemIndex.style.backgroundColor = "#383838";
    });

    $logItem.append($logItemIndex, $logItemContent, $logDeleteBtn);
    $logList.append($logItem);
  }
}

/* Caculator Event Handlers */
function handleNumber(button) {
  const buttonValue = button.textContent;

  if (!isCalculating && $result.textContent.length >= 15) {
    return;
  }

  if (operator === "=") {
    firstOperand = buttonValue;
    operator = "";
    $formula.textContent = "";
    $result.textContent = buttonValue;
    adjustFontSize();
    isCalculating = false;
    return;
  }

  if ($result.textContent === "0" || isCalculating) {
    if ($result.textContent === "-") {
      $result.textContent += buttonValue;
    } else {
      $result.textContent = buttonValue;
    }
    secondOperand = $result.textContent;
    isCalculating = false;
  } else {
    $result.textContent += buttonValue;
    secondOperand = $result.textContent;
  }

  adjustFontSize();
  isInitialized = false;
}

function handleOperator(button) {
  const currentOperator = button.textContent;

  if (isCalculating && currentOperator !== "=") {
    operator = currentOperator;
    return;
  }

  if (operator && secondOperand !== undefined) {
    display.formula = `${firstOperand} ${operator} ${secondOperand} =`;
    // display.formula = display.formula.replace("= =", "="); // '=' 연속 처리 방지
    displayFormula();
    display.result = calculate(firstOperand, secondOperand, operator);

    if (display.result.toString().length > 16) {
      display.result = Number(display.result).toExponential(10);
    }

    displayResult();
    adjustFontSize();
    firstOperand = display.result;
    secondOperand = undefined;
    operator = currentOperator;
  } else {
    operator = currentOperator;
    firstOperand = $result.textContent;
  }

  isCalculating = true;

  if (currentOperator === "=") {
    displayLog();
    operator = "";
  }
}

function handleFunction(button) {
  const functionBtn = button.textContent;
  switch (functionBtn) {
    case "C":
      $result.textContent = 0;
      firstOperand = 0;
      secondOperand = 0;
      operator = "";
      $formula.textContent = "";
      isInitialized = true;
      adjustFontSize();
      break;
    case "%":
      let perResult = Number($result.textContent * 0.01);

      if (Math.abs(perResult) < 1e-6 || perResult.toString().length > 16) {
        $result.textContent = Number(perResult.toExponential(2));
      } else {
        $result.textContent = Number(perResult);
      }

      if (secondOperand !== undefined) {
        secondOperand = $result.textContent;
      } else {
        firstOperand = $result.textContent;
      }

      adjustFontSize();
      break;
    case "±":
      toggleSign();
      if (secondOperand !== undefined) {
        secondOperand = $result.textContent;
      } else {
        firstOperand = $result.textContent;
      }
      break;
  }
}

function handleDot() {
  if ($result.textContent.includes(".")) return;

  if (isCalculating) {
    $result.textContent = "0.";
    isCalculating = false;
  } else {
    if ($result.textContent === "0") {
      $result.textContent = "0.";
    } else {
      $result.textContent += ".";
    }
  }
}

function handleButtons(event) {
  const button = event.target;
  const btnClassList = button.classList;

  if (btnClassList.contains("number")) {
    handleNumber(button);
  } else if (btnClassList.contains("operator")) {
    handleOperator(button);
  } else if (btnClassList.contains("function")) {
    handleFunction(button);
  } else if (btnClassList.contains("dot")) {
    handleDot(button);
  }
}

/* header buttons */
$copyBtn.addEventListener("click", handleCopy);
$restoreBtn.addEventListener("click", handleRestore);

/* calculator buttons */
$buttons.forEach(($button) => {
  $button.addEventListener("click", handleButtons);
});

/* memo button */
$logResetBtn.addEventListener("click", () => {
  $logList.innerHTML = "";
  logIndex = 1;
});
