import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const RegitserShapeContainer = styled.div`
  width: 410px;
  margin: auto;
  margin-top: 30px;
  @media (max-width: 480px) {
    width: 36rem;
  }
  @media (max-width: 366px) {
    width: 25.8rem;
  }
`;

const RegitserShape = styled.div`
  width: 100%;
  padding: 15px;
  background-color: var(--color-grey-50);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  @media (max-width: 366px) {
    padding: 1.4rem;
  }
`;

const RegShapeUnderline = styled.div`
  position: relative;
  text-align: center;
  margin-top: 20px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: -5px;
    width: 40%;
    border-bottom: solid 1px white;
  }
  &:before {
    left: 0;
  }

  &:after {
    right: 0%;
  }
  @media (max-width: 366px) {
    margin-top: 1.8rem;
  }
`;

const Or = styled.span`
  position: absolute;
  top: -15px;
  left: 47%;
`;

const Already = styled.div`
  padding-top: 8px;
  font-size: 1.6rem;

  margin: 0 auto;
  @media (max-width: 366px) {
    font-size: 1.46rem;
  }
`;

const Link = styled.a`
  padding-left: 5px;
  cursor: pointer;
  color: var(--color-brand-600);

  &:hover {
    color: var(--color-brand-700);
  }
  @media (max-width: 366px) {
    font-size: 1.5rem;
  }
`;

function LoginForm({ screenWidth }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  function handleHaveAcc(e) {
    e.preventDefault();
    navigate("/signup");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <Input
          inputType="regular"
          type="email"
          id="email"
          placeholder="Email address*"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Input
          inputType="regular"
          type="password"
          id="password"
          placeholder="Password*"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="login" disabled={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>

      <FormRowVertical>
        <RegitserShapeContainer screenWidth={screenWidth}>
          <RegitserShape>Log in</RegitserShape>
          <RegShapeUnderline>
            <Or>OR</Or>
          </RegShapeUnderline>
        </RegitserShapeContainer>
        <Already>
          i don't have account ? <Link onClick={handleHaveAcc}>sign up</Link>
        </Already>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
