import styled from "styled-components";

const Input = styled.input`
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
  &:focus {
    border-bottom: 2px solid gold;
  }
`;

export default function TextFormInput({ value, onChange, placeholder }) {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={12}
    />
  );
}
