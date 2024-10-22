import styled from "styled-components";
import { useDayString } from "../../hooks/useDayString";
import { useTimeString } from "../../hooks/useTimeString";
import { useEffect, useState } from "react";
import SubmitBtn from "./form/SubmitBtn";
import TextFormInput from "./form/TextFormInput";

const Wrapper = styled.header`
  width: 100%;
  font-family: "Oxanium", sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  form {
    height: 32px;
  }
`;

const Greeting = styled.p`
  min-width: 300px;
  height: 32px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: gold;
  }
`;

const HeaderInput = styled(TextFormInput)`
  &::placeholder {
    color: black;
  }
`;

const CurrentTime = styled.p`
  font-size: 1.3rem;
`;

export default function Header() {
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dayString = useDayString();
  const timeString = useTimeString();

  const handleUsername = (e) => {
    e.preventDefault();
    console.log(username);
    localStorage.setItem("user", username);
    setIsEditing(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <Wrapper>
      {isEditing ? (
        <form onSubmit={handleUsername}>
          <HeaderInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Id 입력"
          />
          <SubmitBtn>등록</SubmitBtn>
        </form>
      ) : (
        <Greeting onClick={() => setIsEditing(true)}>
          {`Hello, ${username || "stranger"}!👋`}
        </Greeting>
      )}

      <CurrentTime>{`${dayString} / ${timeString}`}</CurrentTime>
    </Wrapper>
  );
}
