import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getRandomQuote from "../utils/getRandomQuote";
import { ArrowPathIcon as OriginalArrowPathIcon } from "@heroicons/react/24/outline";

const Wrapper = styled.div`
  min-width: 300px;
  background-color: black;
  color: white;
  margin: 20px 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const ArrowPathIcon = styled(OriginalArrowPathIcon)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  &:hover {
    color: red;
  }
`;

export default function Quotes() {
  const [quote, setQuote] = useState({ quote: "", author: "" });

  useEffect(() => {
    const randomQuote = getRandomQuote();
    setQuote(randomQuote);
  }, []);

  const handleClick = () => {
    const newRandomQuote = getRandomQuote();
    setQuote(newRandomQuote);
  };

  return (
    <Wrapper>
      <p>{quote.quote}</p>
      <p>{quote.author}</p>
      <ArrowPathIcon onClick={handleClick} />
    </Wrapper>
  );
}
