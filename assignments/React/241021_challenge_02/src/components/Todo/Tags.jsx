import styled from "styled-components";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Wrapper = styled.section`
  width: 100%;
  height: max-content;
  margin-bottom: 15px;
  display: flex;
`;

const TagList = styled.ul`
  width: 100%;
  height: max-content;
  display: flex;

  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

const TagItem = styled.li`
  list-style: none;
  padding: 8px 15px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  button {
    all: unset;
  }
  background-color: ${(props) => (props.selected ? "black" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
`;

export default function Tags({ tags, setTags }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState("");

  const deleteTag = (indexToDelete) => {
    setTags((prevTags) => prevTags.filter((_, idx) => idx !== indexToDelete));
  };

  const toggleNewTag = () => {
    setIsAdding((prev) => !prev);
  };

  const addNewTag = (e) => {
    e.preventDefault();
    if (newTag === "") return;
    setIsAdding((prev) => !prev);
    setTags([...tags, newTag]);
    setNewTag("");
  };

  return (
    <Wrapper>
      <TagList>
        {tags.map((tag, idx) => {
          return (
            <TagItem key={idx} onClick={() => deleteTag(idx)}>
              {tag}
            </TagItem>
          );
        })}
        {isAdding ? (
          <form onSubmit={addNewTag}>
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              type="text"
              placeholder="태그 입력"
            />
            <button>입력</button>
          </form>
        ) : (
          <TagItem onClick={toggleNewTag}>+ New Tag</TagItem>
        )}
      </TagList>
    </Wrapper>
  );
}
