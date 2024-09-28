const $buttons = document.querySelectorAll(".button");
const $display = document.querySelector(".display");
const $result = $display.querySelector(".result");

let firstOperand = null;
let secondOperand = null;
let operator;
let prevResult = null;
let operatorClicked = false;

function handleOperate($button) {
  if ($button.textContent === "=") {
    if (!operatorClicked) {
      secondOperand = $result.textContent;
    }
    const result = handleCalculate(firstOperand, secondOperand, operator);
    $result.textContent = result;
    firstOperand = result;
    operator = null;
  }
  // 소수점 버튼 추가하기
  else if ($button.textContent === ".") {
    if (operatorClicked) {
      $result.textContent = "0.";
    } else {
      // 디스플레이에 이미 소수점이 있으면 입력 무시하기
      if ($result.textContent.includes(".")) return;
      $result.textContent += ".";
    }
  } else {
    if (firstOperand === null) {
      firstOperand = $result.textContent;
      operator = $button.textContent;
      operatorClicked = true;
      console.log(`First Operand: ${$result.textContent}`);
      console.log(`Operator: ${$button.textContent}`);
    } else {
    }
    operator = $button.textContent;
    operatorClicked = true;
    console.log(`First Operand: ${$result.textContent}`);
    console.log(`Operator: ${$button.textContent}`);
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
    secondOperand = $result.textContent;
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
