import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled, { keyframes } from "styled-components";
import getRandomQuote from "../../utils/getRandomQuote";
import { ArrowPathIcon as OriginalArrowPathIcon } from "@heroicons/react/24/outline";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

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
  border-radius: 20px;
  p {
    animation: ${slideUp} 0.5s ease-out;
  }
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
      <p key={uuidv4()}>{quote.quote}</p>
      <p key={uuidv4()}>{quote.author}</p>
      <ArrowPathIcon onClick={handleClick} />
    </Wrapper>
  );
}
