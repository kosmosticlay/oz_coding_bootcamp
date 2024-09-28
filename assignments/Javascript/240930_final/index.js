const $buttons = document.querySelectorAll(".button");
const $display = document.querySelector(".display");
const $result = $display.querySelector(".result");

let firstOperand = null;
let secondOperand = null;
let operator;
let prevResult = null;
let operatorClicked = false;

function handleOperate($button) {
  // = 버튼 클릭시
  if ($button.textContent === "=") {
    if (operator === null) return;
    secondOperand = $result.textContent;
    displayResult();
  }
  // 소수점 버튼 클릭시
  else if ($button.textContent === ".") {
    if (operatorClicked) {
      $result.textContent = "0.";
    } else {
      // 디스플레이에 이미 소수점이 있으면 입력 무시하기
      if ($result.textContent.includes(".")) return;
      $result.textContent += ".";
    }
  }
  // 산술연산자 클릭시
  else {
    // 첫번째 피연산자가 없을 때
    if (firstOperand === null) {
      firstOperand = $result.textContent;
      operator = $button.textContent;
      operatorClicked = true;
    }
    // 두번째 피연산자를 입력할 때
    else {
      secondOperand = $result.textContent;
      displayResult();
      operator = $button.textContent;
      operatorClicked = true;
    }
  }
}

function handleFunction($button) {
  // Clear 기능 추가하기
  if ($button.textContent === "C") {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    $result.textContent = "0";
  }
}

function handleNumber($button) {
  if (operatorClicked) {
    if ($result.textContent === "0.") {
      $result.textContent += $button.textContent;
    } else {
      $result.textContent = $button.textContent;
    }
    operatorClicked = false;
  } else {
    if ($result.textContent === "0") {
      $result.textContent = $button.textContent;
    } else {
      $result.textContent += $button.textContent;
    }
  }
}

function handleCalculate(first, second, operator) {
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
  const prevResult = handleCalculate(firstOperand, secondOperand, operator);
  $result.textContent = prevResult;
  firstOperand = prevResult ? prevResult : firstOperand;
  secondOperand = null;
  console.log(`First Operand: ${firstOperand}`);
  console.log(`Operator: ${operator}`);
}

$buttons.forEach(($button) => {
  $button.addEventListener("click", (event) => {
    const buttonEl = event.target;

    // (화면 기준) 글자 23개 이상이면 이후 입력 무시하기
    if ($result.textContent.length >= 20) return;

    if ($button.classList.contains("number")) {
      handleNumber($button);
    }

    if ($button.classList.contains("operator")) {
      handleOperate(buttonEl);
    }

    if ($button.classList.contains("function")) {
      handleFunction($button);
    }
  });
});
