import styled, { css } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
import { useMini } from "../context/MiniContext";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 0rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  ${(props) =>
    props.type === "mini" &&
    css`
      transform: translateX(-100%);
      position: absolute;
      height: 100vh;
      z-index: 100;
      transition: 0.7s;
    `}
  ${(props) =>
    props.type === "mini" &&
    props.mini === true &&
    css`
      top: 0;
      left: 0;
      box-shadow: var(--shadow-lg);
      transform: translateX(0);
    `}
`;

function Sidebar({ type }) {
  const { mini } = useMini();
  return (
    <StyledSidebar type={type} mini={mini}>
      <Logo />
      <MainNav />

      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
