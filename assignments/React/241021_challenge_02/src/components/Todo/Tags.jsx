import styled from "styled-components";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

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
  background-color: ${(props) => (props.$isSelected ? "black" : "white")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  display: flex;
  gap: 5px;
  align-items: center;
  svg {
    width: 15px;
    stroke-width: 2;
    &:hover {
      color: red;
    }
  }
`;

// tags = [{id:uuidv4(), tagName, isSelected}]
export default function Tags({ tags, setTags, selectedTags, setSelectedTags }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState("");

  const deleteTag = (e) => {
    e.stopPropagation(); // 상위 요소로 이벤트 전파 차단
    const tagId = e.currentTarget.getAttribute("data-id");
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  };

  const selectTag = (tagId) => {
    const updatedTags = tags.map((tag) =>
      tag.id === tagId ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
    setSelectedTags(updatedTags.filter((tag) => tag.isSelected));
  };

  const toggleNewTag = () => {
    setIsAdding((prev) => !prev);
  };

  const addNewTag = (e) => {
    e.preventDefault();
    if (newTag === "") return;
    setIsAdding((prev) => !prev);
    setTags([...tags, { id: uuidv4(), tagName: newTag, isSelected: false }]);
    setNewTag("");
  };

  console.log(tags, selectedTags);

  return (
    <Wrapper>
      <TagList>
        {tags.map((tag) => {
          const { id, tagName, isSelected } = tag;
          return (
            <TagItem
              key={id}
              onClick={() => selectTag(id)}
              $isSelected={isSelected}
            >
              {tagName}
              <XMarkIcon data-id={id} onClick={deleteTag} />
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
