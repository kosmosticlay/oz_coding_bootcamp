# `onload`와 `addEventListener` 동작 차이

## `onload`

- **단일 핸들러** : **한 번에 하나의 핸들러**만 등록
- 기존에 등록된 핸들러가 있으면 덮어쓰게 됨

## `addEventListener`

- **다중 핸들러** : 동일한 이벤트(예: `load`)에 대해 여러 개의 핸들러를 추가 가능
- 이벤트가 발생할 때마다 등록된 **모든 핸들러가 호출됨**

<hr/>

# 과제에서 `reset`버튼 눌렀을 때의 차이

## `request1.addEventListener`방식

`getDogs()`함수 내에서 `request1.addEventListener("load")`로 이벤트 핸들러를 등록하면,

- 페이지가 처음 로딩될 때 `window.addEventListener("load", getDogs)`에 의해 `getDogs()`가 호출되고, 이 때 `request1.addEventListener("load", handler)`가 등록
- 사용자가 reset 버튼을 눌렀을 때, `getDogs()`가 다시 호출되고,
  이때 다시 request1.addEventListener("load", handler)가 등록

즉, 동일한 `request1`객체에서 두 번의 `load`이벤트가 발생할 때마다 두 개의 핸들러가 실행된다.

<br />

## `request1.onload`방식

`getDogs()` 함수 내에서 `request1.onload`로 이벤트 핸들러를 등록하면:

- 페이지가 처음 로딩될 때: `window.addEventListener("load", getDogs)`에 의해 `getDogs()`가 호출되고, 이 때 `request1.onload = handler`로 핸들러가 등록
- 사용자가 reset 버튼을 눌렀을 때: reset 버튼을 누르면 `getDogs()`가 다시 호출되고, 이때도 새로운 핸들러가 등록되면서 이전 핸들러는 덮어씌워짐

즉, 동일한 `request1`객체에는 항상 하나의 핸들러만 등록되기 때문에 중복 실행되지 않는다.
