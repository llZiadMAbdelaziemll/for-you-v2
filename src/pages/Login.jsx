import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Description from "../ui/Description";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
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
`;
const LogoLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url("./public/login/logolayout.jpg") no-repeat;
  background-size: cover;
  padding-top: 8rem;
  // background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <LogoLayout>
        <Logo />
      </LogoLayout>

      <LoginFormLayout>
        <Heading as="h2">Log in</Heading>
        <Description as="h4">Log in to your account</Description>
        <LoginForm />
      </LoginFormLayout>
    </LoginLayout>
  );
}

export default Login;
