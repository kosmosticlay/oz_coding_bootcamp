import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { data } from "../assets/data/data";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.1rem;
  cursor: pointer;
`;

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const animal = data.filter((el) => el.id === Number(id));
  const [{ name, img, description }] = animal;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <div>
        <img src={img} alt={name} />
        <p>이름 : {name}</p>
        <p>설명 : {description}</p>
      </div>
      <BackButton onClick={goBack}>이전 화면으로</BackButton>
    </Wrapper>
  );
}
