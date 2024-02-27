import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Description from "../ui/Description";

const SignupLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  align-content: center;
  justify-content: center;
  // background-color: var(--color-grey-50);
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
`;
const LogoLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url("/logolayout.jpg") no-repeat;
  background-size: cover;
  padding-top: 8rem;
  // background-color: var(--color-grey-50);
`;

function Signup() {
  return (
    <SignupLayout>
      <LogoLayout>
        <Logo />
      </LogoLayout>
      {/* <Heading as="h4">sign up</Heading> */}
      <SignupFormLayout>
        <Heading as="h3">sign up</Heading>
        <Description as="h4">Enter details to create your account</Description>
        <SignupForm />
      </SignupFormLayout>
    </SignupLayout>
  );
}

export default Signup;
