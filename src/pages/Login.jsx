import styled, { css } from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { useScreenWidth } from "../hooks/useScreenWidth";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Description from "../ui/Description";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  ${(props) =>
    props.screenWidth <= 480 &&
    css`
      grid-template-columns: 100%;
    `}
  align-content: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const LoginFormLayout = styled.div`
  background-color: var(--color-grey-0);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  algin-items: center;
  padding: 2.4rem 4rem;
  gap: 1.2rem;
  & h2,
  & h4 {
    padding-left: 12.5rem;
  }
  ${(props) =>
    props.screenWidth <= 480 &&
    css`
      background: url("/darkedlogolayout.jpg") no-repeat;
      background-size: cover;
      & h2,
      & h4 {
        padding-left: 0;
        margin-left: auto;
        margin-right: auto;
      }

      & form {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        background-color: transparent;
      }
      & form input {
        width: 36rem;
        margin-left: auto;
        margin-right: auto;
        padding-left: 2rem;
        border: none;
      }
      & form button {
        width: 36rem;
      }
    `}
  ${(props) =>
    props.screenWidth <= 366 &&
    css`
      & h4 {
        font-size: 1.53rem;
      }
      & form input {
        width: 25.8rem;
        padding-left: 1.34rem;
        font-size: 1.3rem;
      }
      & form button {
        width: 25.8rem;
        font-size: 1.5rem;
      }
    `}
`;
const LogoLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url("/logolayout.jpg") no-repeat;
  background-size: cover;
  padding-top: 8rem;
`;

function Login() {
  const screenWidth = useScreenWidth();
  return (
    <LoginLayout screenWidth={screenWidth}>
      {screenWidth > 480 && (
        <LogoLayout>
          <Logo />
        </LogoLayout>
      )}

      <LoginFormLayout screenWidth={screenWidth}>
        <Heading as="h2">Log in</Heading>
        <Description as="h4">Log in to your account</Description>
        <LoginForm screenWidth={screenWidth} />
      </LoginFormLayout>
    </LoginLayout>
  );
}

export default Login;
