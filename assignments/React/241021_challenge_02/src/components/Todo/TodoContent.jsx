import styled from "styled-components";
import TodoItem from "./TodoItem";
import Filter from "./Filter";
import { getTodos } from "../../utils/jsonAPI";
import { useEffect } from "react";

const Wrapper = styled.ul`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  gap: 8px;
`;

export default function TodoContent({ todos, setTodos }) {
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos.reverse());
    };

    fetchTodos();
  }, []);

  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const removeTodo = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const sortedTodos = todos.sort(
    (a, b) => b.isFavorite - a.isFavorite || a.isDone - b.isDone
  );

  return (
    <Wrapper>
      <Filter />
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      ))}
    </Wrapper>
  );
}
