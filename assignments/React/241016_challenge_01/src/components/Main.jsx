import React, { useState } from "react";
import { data } from "../assets/data/data";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Card from "./Card";

const Wrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Main() {
  return (
    <Wrapper>
      <CardContainer>
        {data.map((el) => {
          const { id, name, img, description } = el;
          return (
            <Link to={`/detail/${id}`} key={id}>
              <Card name={name} img={img} description={description} />
            </Link>
          );
        })}
      </CardContainer>
    </Wrapper>
  );
}
