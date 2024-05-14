import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { MdTableRows } from "react-icons/md";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useMini } from "../context/MiniContext";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  & button.rotate {
    transform: rotate(90deg);
  }
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const width = useScreenWidth();
  const { mini, toggleMini } = useMini();

  return (
    <StyledHeaderMenu>
      {width <= 480 && (
        <li onClick={toggleMini}>
          <ButtonIcon className={mini ? "rotate" : ""}>
            <MdTableRows className="tabIcon" />
          </ButtonIcon>
        </li>
      )}
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
