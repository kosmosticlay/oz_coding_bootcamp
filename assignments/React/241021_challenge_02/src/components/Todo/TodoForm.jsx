import styled from "styled-components";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Tags from "./Tags";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../utils/jsonAPI";
import { useRef } from "react";

const Wrapper = styled.section`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: azure;
  padding: 10px 20px;
  border-radius: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Form = styled.form`
  min-width: 270px;
  width: 50%;
  height: 40px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  button {
    min-width: 70px;
    font-size: 1.1rem;
    padding: 0 10px;
  }
  svg {
    color: gray;
  }
  input {
    font-size: 1.1rem;
    outline: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid black;
    padding-bottom: 5px;
    &:focus {
      border-bottom: 2px solid #6ba0a0;
    }
  }
`;

const AddForm = styled(Form)`
  flex-grow: 1;
  input {
    flex-grow: 1;
    padding-left: 30px;
    height: 30px;
  }
  button {
    background-color: #6ba0a0;
    border-radius: 10px;
    border: none;
    font-weight: bold;
  }
`;
const SearchForm = styled(Form)`
  width: 270px;
  justify-content: flex-end;
  input {
    width: 60%;
  }
`;

const InputContainer = styled.div`
  min-width: 50px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 0;
    top: 3px;
  }
`;

export default function TodoForm({ setTodos, todos }) {
  const [isSearching, setIsSearching] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef(null);

  const handleAdd = async (event) => {
    event.preventDefault();

    const todoItem = {
      id: uuidv4(),
      todo: newTodo,
      tags: tags,
      isDone: false,
      isFavorite: false,
    };

    try {
      await addTodo(todoItem);
      setTodos([todoItem, ...todos]);
      setNewTodo("");
      inputRef.current.focus();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setIsSearching(false);
    console.log("handleSearch");
  };
  return (
    <Wrapper>
      <Tags tags={tags} setTags={setTags} />
      <FormContainer>
        <AddForm onSubmit={handleAdd}>
          <InputContainer>
            <PlusIcon />
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              type="text"
              placeholder="새로운 할 일을 입력"
              ref={inputRef}
            />
          </InputContainer>
          <button>입력</button>
        </AddForm>
        <SearchForm onSubmit={handleSearch}>
          {isSearching ? (
            <>
              <input type="text" placeholder="검색어 입력" />
              <button>검색</button>
            </>
          ) : (
            <>
              <MagnifyingGlassIcon onClick={() => setIsSearching(true)} />
            </>
          )}
        </SearchForm>
      </FormContainer>
    </Wrapper>
  );
}
