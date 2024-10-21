import styled from "styled-components";
import { PencilIcon, TrashIcon, StarIcon } from "@heroicons/react/24/solid";

const Container = styled.li`
  background-color: blueviolet;
  list-style: none;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemContent = styled.div`
  width: 55%;
  background-color: antiquewhite;
  display: flex;
  gap: 10px;
`;

const Tags = styled.ul`
  width: 30%;
  background-color: aquamarine;
`;
const Controls = styled.div`
  svg {
    margin: 0 5px;
  }
`;

export default function TodoItem() {
  return (
    <Container>
      <ItemContent>
        <input type="checkbox" />
        <p>오늘 해야 할일은 무엇일까욘</p>
      </ItemContent>
      <Tags>heelo </Tags>
      <Controls>
        <StarIcon />
        <PencilIcon />
        <TrashIcon />
      </Controls>
    </Container>
  );
}
