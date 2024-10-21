import styled from "styled-components";
import Todo from "./components/Todo/Todo";
import TimeTrack from "./components/Timer/TimeTrack";

const Wrapper = styled.div`
  min-width: 360px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  font-family: "Agdasima", sans-serif;
`;

function App() {
  return (
    <Wrapper>
      <Todo />
      <TimeTrack />
    </Wrapper>
  );
}

export default App;
