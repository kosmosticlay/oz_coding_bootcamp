import styled from "styled-components";
import {
  PencilIcon as OriginalPencilIcon,
  TrashIcon as OriginalTrashIcon,
  StarIcon as OriginalStarIcon,
} from "@heroicons/react/24/solid";
import {
  updateTodo as updateTodoAPI,
  deleteTodo as deleteTodoAPI,
} from "../../utils/jsonAPI";
import { useState } from "react";

const Container = styled.li`
  list-style: none;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  &:hover {
    box-shadow: 2px 2px 2px 2px black;
  }
`;
//   background-color: ${(props) =>
//  props.$isDone ? "#cdcdcd" : "transparent};
//    box-shadow: ${(props) =>
//  props.$isDone ? "none" : "2px 2px 2px 2px black"};

const EditItemContent = styled.form`
  max-width: 520px;
  width: 55%;
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    width: 100%;
    height: 28px;
    outline: none;
    border: none;
    font-size: 1rem;
    padding-left: 10px;
  }
  button {
    min-width: 50px;
    height: 30px;
    font-weight: bold;
  }
`;

const ItemContent = styled.div`
  max-width: 520px;
  width: 55%;
  display: flex;
  gap: 10px;
  cursor: pointer;
  p {
    height: 30px;
    text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
    display: flex;
    align-items: center;
  }
  input[type="checkbox"] {
    cursor: pointer;
  }
`;

const Tags = styled.ul`
  width: 30%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  li {
    font-size: 0.8rem;
    padding: 8px 15px;
    border-radius: 20px;
    background-color: black;
    color: white;
  }
`;
const StarIcon = styled(OriginalStarIcon)`
  color: ${(props) => (props.$isFavorite ? "gold" : "black")};
`;

const PencilIcon = styled(OriginalPencilIcon)`
  color: ${(props) => (props.$isEditing ? "red" : "black")};
  &:hover {
    color: red;
  }
`;

const TrashIcon = styled(OriginalTrashIcon)`
  &:hover {
    color: red;
  }
`;
const Controls = styled.div`
  min-width: 120px;
  display: flex;
  justify-content: flex-end;
  svg {
    margin: 0 5px;
  }
`;

export default function TodoItem({ todo, updateTodo, removeTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const toggleTodo = async () => {
    const updatedTodo = { ...todo, isDone: !todo.isDone };
    const updatedTodoFromServer = await updateTodoAPI(todo.id, {
      isDone: !todo.isDone,
    });

    updateTodo(updatedTodoFromServer || updatedTodo);
  };

  const toggleFavorite = async () => {
    const updatedTodo = { ...todo, isFavorite: !todo.isFavorite };
    const updatedTodoFromServer = await updateTodoAPI(todo.id, {
      isFavorite: !todo.isFavorite,
    });

    updateTodo(updatedTodoFromServer || updatedTodo);
  };

  const toggleEdit = async () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, todo: editText };
    const updatedTodoFromServer = await updateTodoAPI(todo.id, {
      todo: editText,
    });

    updateTodo(updatedTodoFromServer || updatedTodo);
    setIsEditing(false);
  };

  const deleteTodo = async () => {
    await deleteTodoAPI(todo.id);
    removeTodo(todo.id);
  };

  return (
    <Container $isDone={todo.isDone}>
      {isEditing ? (
        <EditItemContent onSubmit={handleUpdateTodo}>
          <input type="text" value={editText} onChange={handleInputChange} />
          <button>수정</button>
        </EditItemContent>
      ) : (
        <ItemContent $isDone={todo.isDone} onClick={toggleTodo}>
          <input type="checkbox" checked={todo.isDone} readOnly />
          <p>{todo.todo}</p>
        </ItemContent>
      )}
      <Tags>
        {todo.tags.map((tag, idx) => (
          <li key={idx}>{tag}</li>
        ))}
      </Tags>
      <Controls>
        <StarIcon onClick={toggleFavorite} $isFavorite={todo.isFavorite} />
        <PencilIcon onClick={toggleEdit} $isEditing={isEditing} />
        <TrashIcon onClick={deleteTodo} />
      </Controls>
    </Container>
  );
}
