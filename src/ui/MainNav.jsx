import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  // HiOutlineCalendarDays,
  // HiOutlineCog6Tooth,
  // HiOutlineHome,
  // HiOutlineHomeModern,
  // HiOutlineUsers,
  HiUserGroup,
} from "react-icons/hi2";
import { AiFillProfile } from "react-icons/ai";
import { FaRegPlusSquare, FaUserInjured, FaHome } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <FaHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/doctors">
            <HiUserGroup />
            <span>Doctor List</span>
          </StyledNavLink>
        </li>
        {userRole !== "patient" && (
          <li>
            <StyledNavLink to="/patients">
              <FaUserInjured />
              <span>Patient List</span>
            </StyledNavLink>
          </li>
        )}

        <li>
          <StyledNavLink to="/appointments">
            <MdAssignment />
            <span>Appointments</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/advanced">
            <FaRegPlusSquare />
            <span>Advanced</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiUserGroup />
            <span>Sittings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
