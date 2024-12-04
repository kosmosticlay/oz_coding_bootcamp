## Node.js 3일차 과제

### 주제 : Session으로 유저정보 관리하기

### 학습 목표

1. 쿠키와 세션이 무엇인지, 각각의 역할과 사용 목적을 이해한다.
2. 쿠키와 세션의 주요 차이점을 이해하고, 각각이 어떤 상황에서 사용되는지 설명할 수 있다.
3. 쿠키와 세션을 사용하여 로그인 상태 유지, 사용자 정보 저장 등의 기능을 구현할 수 있다.
4. HTTP 요청과 응답 과정에서 쿠키와 세션이 어떻게 주고받아지는지 이해한다.

### 기본 요구 사항

1. 요구사항에 맞도록 session 옵션을 설정해 주세요. (총 4가지)
2. 요청 바디에서 전달받은 값을 구조분해 할당을 사용하여 관리하세요.
3. users의 정보와 사용자가 입력한 정보를 비교하여 일치하는 회원이 존재하는지 확인하는 로직을 작성하세요.
4. 세션 내 정보를 삭제하는 메소드를 작성하세요.
5. 쿠키를 삭제하는 메소드를 작성하세요.

### 🚨 주의사항

1. session origin 주소의 포트번호는 **본인의 라이브 서버 포트번호로 변경**해서 서버를 실행하세요.
2. Fork 후 Clone 받은 코드를 실행하기 전 `npm install` 명령어를 사용하여 라이브러리를 설치한 후 과제를 진행하세요.
3. 과제 실습 결과를 확인하는 경우 도메인을 `http://127.0.0.1` 가 아닌 반드시 `localhost` 로 변경하신 후에 확인하세요.
   1. `http://127.0.0.1` 에서 결과를 확인하는 경우, 쿠키가 제대로 생성되지 않을 수 있습니다.