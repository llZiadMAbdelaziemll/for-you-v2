import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useScreenWidth } from "../hooks/useScreenWidth";
import styled, { css } from "styled-components";
import { useState } from "react";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;

  grid-template-rows: auto 1fr;
  height: 100vh;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;

    overflow-y: hidden;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 2.5rem 6.4rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 480px) {
    padding: 4rem 2.5rem 4rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 480px) {
    max-width: 45rem;
  }
`;

function AppLayout() {
  const width = useScreenWidth();

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar type={width <= 480 ? "mini" : "large"} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
