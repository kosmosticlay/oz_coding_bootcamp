import styled from "styled-components";
import Header from "./Header";
import Quotes from "./Quotes";
import TodoForm from "./TodoForm";
import TodoContent from "./TodoContent";

const Wrapper = styled.div`
  min-width: 360px;
  flex-grow: 1;
  background-color: #96caca;
  padding: 30px;
  h1 {
    margin: 30px;
  }
`;

export default function Todo() {
  return (
    <Wrapper>
      <Header />
      <Quotes />
      <h1>Things to Do</h1>
      <TodoForm />
      <TodoContent />
    </Wrapper>
  );
}
