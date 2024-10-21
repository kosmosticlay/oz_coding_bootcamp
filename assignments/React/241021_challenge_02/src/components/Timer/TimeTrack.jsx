import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 360px;
  flex-grow: 1;
  background-color: azure;
  position: relative;
`;

const Container = styled.div`
  position: sticky;
  top: 0;
`;

const Tabs = styled.div`
  width: 100%;
  height: 80px;
  background-color: #6ba0a0;
  display: flex;
`;

const Tab = styled.div`
  width: 50%;
  height: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${(props) => (props.$isActive ? "azure" : "#6ba0a0")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function TimeTrack() {
  const [activeTab, setActiveTab] = useState("Timer");
  return (
    <Wrapper>
      <Container>
        <Tabs>
          <Tab
            $isActive={activeTab === "Timer"}
            onClick={() => setActiveTab("Timer")}
          >
            <h1>Timer</h1>
          </Tab>
          <Tab
            $isActive={activeTab === "Stopwatch"}
            onClick={() => setActiveTab("Stopwatch")}
          >
            <h1>Stopwatch</h1>
          </Tab>
        </Tabs>
      </Container>
    </Wrapper>
  );
}
