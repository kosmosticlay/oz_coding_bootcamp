import styled from "styled-components";
import { PlusIcon } from "@heroicons/react/24/outline";

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
`;

export default function Tags() {
  return (
    <Wrapper>
      <TagList>
        <TagItem>Private</TagItem>
        <TagItem>Sports</TagItem>
        <TagItem>Sports</TagItem>
        <TagItem>Business</TagItem>
        <TagItem>Sports</TagItem>
        <TagItem>Sports</TagItem>
        <TagItem>Sports</TagItem>
        <TagItem>
          <button>+ New Tag</button>
        </TagItem>
      </TagList>
    </Wrapper>
  );
}
