import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { data } from "../assets/data/data";
import Card from "./Card";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  margin-bottom: 30px;
  input {
    width: 300px;
    height: 40px;
    font-size: 1.1rem;
    padding: 0 10px;
  }
  button {
    margin-left: 10px;
    width: 100px;
    height: 45px;
    font-size: 1.1rem;
  }
`;

const Results = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 50px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const query = searchParams.get("name");
    if (query) {
      const filtered = data.filter((animal) => animal.name.includes(query));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ name: inputValue });
    } else {
      setSearchParams({});
    }
    setInputValue("");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSearch}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="동물 이름 검색"
        />
        <button type="submit">검색</button>
      </Form>
      <Results>
        {filteredData.length > 0 ? (
          filteredData.map((el) => {
            const { id, name, img, description } = el;
            return (
              <Link to={`/detail/${id}`} key={id}>
                <Card name={name} img={img} description={description} />
              </Link>
            );
          })
        ) : (
          <Message>데이터가 없습니다!😔</Message>
        )}
      </Results>
    </Wrapper>
  );
}
