import styled from "styled-components";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Tags from "./Tags";
import { useState } from "react";

const Wrapper = styled.section`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  padding: 10px 20px;
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
  }
`;

const AddForm = styled(Form)`
  flex-grow: 1;
  input {
    flex-grow: 1;
    padding-left: 30px;
    height: 30px;
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

export default function TodoForm() {
  const [isSearching, setIsSearching] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    console.log("handleAdd");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setIsSearching(false);
    console.log("handleSearch");
  };
  return (
    <Wrapper>
      <Tags />
      <FormContainer>
        <AddForm onSubmit={handleAdd}>
          <InputContainer>
            <PlusIcon />
            <input type="text" placeholder="새로운 할 일을 입력" />
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
