import styled from "styled-components";
import Timer from "./components/Timer/Timer";
import Todo from "./components/Todo/Todo";

const Wrapper = styled.div`
  min-width: 360px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  font-family: "Agdasima", sans-serif;
`;

function App() {
  return (
    <Wrapper>
      <Todo />
      <Timer />
    </Wrapper>
  );
}

export default App;
