# 🔫트러블슈팅

## 1. 연산자 클릭 후에 숫자가 중첩되어서 표시되는 문제

### 1.1 문제

연산자가 클릭된 후 첫 번째 숫자 입력시, 숫자를 디스플레이에 표시하는 두 번째 조건문 `(if ($result.textContent === "0"))`이 실행되어 다시 디스플레이에 값을 덧붙이는 결과가 발생한다. 이는 연산자 클릭 후 다시 숫자 버튼을 눌렀을 때, `$result.textContent = $button.textContent;` 코드가 2번 실행되기 때문이다.

```javascript
if ($button.className.includes("number")) {
  // 연산자 클릭 후 다시 숫자 버튼 눌렀을 때, 해당 숫자로 초기화하기
  if (operatorClicked) {
    $result.textContent = $button.textContent;
    operatorClicked = false;
  } else {
    // 숫자 버튼을 누르고 다시 숫자 버튼을 눌렀을 때
  }

  // 숫자를 디스플레이에 표시하기
  if ($result.textContent === "0") {
    $result.textContent = $button.textContent;
  } else {
    $result.textContent += $button.textContent;
  }
}
```

### 1.2 해결 방법

`operatorClicked`가 `true`인 경우(=연산자 클릭 후 숫자 버튼을 눌렀을 경우에만),

1. 디스플레이가 초기화되고,
2. 추가적인 숫자 입력 처리 없이 바로 플래그를 `false`로 설정하고 빠져나오도록 변경하였다.

`operatorClicked`가 `false`인 경우(=연산자 클릭 후가 아닌 일반적인 경우에는),
0일 때는 초기화/그외에는 디스플레이에 숫자가 이어지는 로직이 그대로 실행되도록 조건문을 분리하였다.

```javascript
if ($button.className.includes("number")) {
  // 연산자 클릭 후 다시 숫자 버튼 눌렀을 때, 해당 숫자로 초기화하기
  if (operatorClicked) {
    $result.textContent = $button.textContent;
    operatorClicked = false;
  } else {
    // 숫자 버튼을 누르고 다시 숫자 버튼을 눌렀을 때, 디스플레이에 이어쓰기
    if ($result.textContent === "0") {
      $result.textContent = $button.textContent;
    } else {
      $result.textContent += $button.textContent;
    }
  }
}
```

<br/>

## 2. 두번째 피연산자 입력시 `.`을 클릭했을때 디스플레이에 적용되지 않는 문제

### 2.1 문제

연산자가 클릭된 후 두 번째 피연산자를 입력할 때 소수점 `.`버튼을 눌러도 디스플레이에 제대로 반영되지 않는 문제가 발생한다

### 2.2 해결 방법

소수점(.) 버튼이 클릭되었을 때 `operatorClicked`가 `true`라면, 디스플레이를 `0.`으로 초기화 하고, 그외에는 디스플레이에 보이는 숫자에 소수점 `.`을 이어서 붙이도록 조건문을 작성했다

```javascript
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
      $result.textContent += ".";
    }
  } else {
    firstOperand = $result.textContent;
    operator = $button.textContent;
    operatorClicked = true;
    console.log(`First Operand: ${$result.textContent}`);
    console.log(`Operator: ${$button.textContent}`);
  }
}
```

# 3. 부동 소수점으로 인한 연산 오류 문제

## 3.1 문제

5.9 - 3.9 의 결과값이 디스플레이에 2.0000000000000004로 출력된다.

## 3.2 해결 방법

- 일반적으로 부동소수점으로 인한 연산 오류는 소수점 아래 15~17번째 자리에서 발생한다. 따라서 연산 오류를 줄이기 위해 소수점 11번째 자리에서 반올림하여 소수점 아래 10자리 까지만 남도록 `toFixed(10)` 메서드를 사용했다.
- `toFixed()` 메서드의 결과값은 문자열이므로 `parseFloat()`메서드를 사용하여 다시 숫자로 변환하였다.

```javascript
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
```
