import styled from "styled-components";
import Header from "./Header";
import Quotes from "./Quotes";
import TodoForm from "./TodoForm";
import TodoContent from "./TodoContent";
import { useState } from "react";
import { useEffect } from "react";
import { getTodos } from "../utils/jsonAPI";

const Wrapper = styled.div`
  min-width: 360px;
  height: max-content;
  flex-grow: 1;
  background-color: #6ba0a0;
  padding: 30px;
  h1 {
    margin: 30px;
  }
`;

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos.reverse());
    };

    fetchTodos();
  }, []);
  return (
    <Wrapper>
      <Header />
      <Quotes />
      <h1>Things to Do</h1>
      <TodoForm setTodos={setTodos} todos={todos} />
      <TodoContent setTodos={setTodos} todos={todos} />
    </Wrapper>
  );
}
