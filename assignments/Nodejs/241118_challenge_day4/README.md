## 📍`login.js` 파일 내 함수의 역할 설명

### 1. `login` 함수의 실행 과정에 대해 설명

`login` 함수는 클라이언트로부터 전달된 사용자 ID와 비밀번호를 사용하여 로그인 요청을 처리하는 함수입니다. 실행 과정은 다음과 같습니다.

1. 클라이언트로부터 `userId`와 `userPassword`를 `req.body`로 전달받습니다.
2. `users` 배열에서 `userId`와 `userPassword`가 일치하는 사용자를 찾습니다. 이때, `find` 메서드를 사용하여 사용자 정보를 검색합니다.
3. 사용자가 존재하지 않을 경우(`userInfo`가 없을 경우), 상태 코드 `401`을 반환하며 "로그인 실패" 메시지를 클라이언트에 전송합니다.
4. 사용자가 존재할 경우(`userInfo`가 있을 경우), `jwt.sign` 메서드를 사용하여 `userId`를 포함한 JWT 액세스 토큰을 생성합니다. 이때, 토큰의 유효기간은 `1000 * 60 * 10` 밀리초(10분)로 설정됩니다.
5. 생성된 액세스 토큰을 클라이언트에게 응답으로 전송합니다.

### 2. `getUserInfo` 함수의 실행 과정에 대해 설명

`getUserInfo` 함수는 클라이언트로부터 전달된 JWT 액세스 토큰을 검증하고, 해당 사용자의 정보를 반환하는 함수입니다. 실행 과정은 다음과 같습니다.

1. 클라이언트 요청의 `Authorization` 헤더에서 JWT 액세스 토큰을 추출합니다. 토큰은 `Bearer` 문자열 다음에 위치하며, `split(" ")[1]`을 사용하여 가져옵니다.
2. 추출된 액세스 토큰을 `jwt.verify` 메서드를 사용하여 검증합니다. 검증 과정에서 토큰의 유효성과 위조 여부를 확인하며, 성공 시 토큰의 페이로드를 반환합니다.
3. 페이로드에서 `userId`를 추출한 후, `users` 배열에서 해당 사용자의 정보를 찾습니다.
4. 찾은 사용자 정보를 JSON 형식으로 클라이언트에 응답합니다.