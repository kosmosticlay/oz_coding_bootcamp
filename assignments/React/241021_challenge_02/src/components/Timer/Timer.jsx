import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 360px;
  padding: 30px;
  flex-grow: 1;
  background-color: azure;
`;

export default function Timer() {
  return (
    <Wrapper>
      <h1>Timer</h1>
    </Wrapper>
  );
}
