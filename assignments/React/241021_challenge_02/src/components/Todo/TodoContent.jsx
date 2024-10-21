import styled from "styled-components";
import TodoItem from "./TodoItem";
import Filter from "./Filter";

const Wrapper = styled.ul`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 100px;
`;

export default function TodoContent() {
  return (
    <Wrapper>
      <Filter />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </Wrapper>
  );
}
