import styled from "styled-components";

const CardWrapper = styled.li`
  width: 200px;
  height: 250px;
  padding: 15px;
`;

const Image = styled.img`
  height: 150px;
`;

export default function Card({ img, name, description }) {
  return (
    <CardWrapper>
      <Image src={img} alt={name} />
      <p>동물 이름 : {name}</p>
      <p>설명 : {description}</p>
    </CardWrapper>
  );
}
