import styled from "styled-components";

const Button = styled.button`
  background-color: black;
  color: #6ba0a0;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  &:hover {
    background-color: gold;
    color: black;
  }
`;

export default function SubmitBtn({ children }) {
  return <Button>{children}</Button>;
}
