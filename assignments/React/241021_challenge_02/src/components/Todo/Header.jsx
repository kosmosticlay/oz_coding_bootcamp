import styled from "styled-components";

const Wrapper = styled.header`
  width: 100%;
  font-family: "Oxanium", sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Greeting = styled.p`
  min-width: 350px;
  font-size: 2rem;
  font-weight: bold;
`;

const CurrentTime = styled.p`
  font-size: 1.3rem;
`;

export default function Header() {
  return (
    <Wrapper>
      <Greeting>Hello, stranger!👋</Greeting>
      <CurrentTime>Today, Wed 21 Oct 2024</CurrentTime>
    </Wrapper>
  );
}
