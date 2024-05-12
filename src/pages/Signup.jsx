import styled, { css } from "styled-components";
import { useScreenWidth } from "../hooks/useScreenWidth";
import SignupForm from "../features/authentication/SignupForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Description from "../ui/Description";

const SignupLayout = styled.main`
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
`;
const SignupFormLayout = styled.div`
  background-color: var(--color-grey-0);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  algin-items: center;
  padding: 2.4rem 4rem;
  gap: 1.6rem;
  & h2,
  h4 {
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

      & form button:last-child {
        width: 26.5rem;
      }
    `}
  ${(props) =>
    props.screenWidth <= 394 &&
    css`
      padding: 2rem 4rem;

      gap: 1.5rem;

      & h4 {
        font-size: 1.53rem;
      }
      & form input {
        width: 28.2rem;

        padding: 0.8rem 1.2rem;

        font-size: 1.3rem;
      }
      & form button {
        font-size: 1.33rem;
        padding: 1.1rem 0rem;
      }

      & form button:first-child {
        width: 70px;
      }
      & form button:last-child {
        width: 20rem;
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

function Signup() {
  const screenWidth = useScreenWidth();

  return (
    <SignupLayout screenWidth={screenWidth}>
      {screenWidth > 480 && (
        <LogoLayout>
          <Logo />
        </LogoLayout>
      )}

      {/* <Heading as="h4">sign up</Heading> */}
      <SignupFormLayout screenWidth={screenWidth}>
        <Heading as="h2">sign up</Heading>
        <Description as="h4">Enter details to create your account</Description>
        <SignupForm screenWidth={screenWidth} />
      </SignupFormLayout>
    </SignupLayout>
  );
}

export default Signup;
