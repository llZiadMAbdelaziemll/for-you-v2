import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegitserShapeContainer = styled.div`
  width: 410px;
  margin: auto;
  margin-top: 30px;
  @media (max-width: 480px) {
    width: 36rem;
  }
  @media (max-width: 394px) {
    width: 28.2rem;
  }
`;

const RegitserShape = styled.div`
  width: 100%;
  padding: 15px;
  background-color: var(--color-grey-50);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  @media (max-width: 394px) {
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
  @media (max-width: 394px) {
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
  text-align: center;

  margin: 0 auto;
  @media (max-width: 394px) {
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
  @media (max-width: 394px) {
    font-size: 1.5rem;
  }
`;

export default function AuthLogoShape({ type }) {
  const navigate = useNavigate();

  const typeCheck = type === "login";

  function handleAuthType() {
    typeCheck ? navigate("/signup") : navigate("/login");
  }

  return (
    <div>
      <RegitserShapeContainer>
        <RegitserShape>{typeCheck ? "Log in" : "Sign up"}</RegitserShape>
        <RegShapeUnderline>
          <Or>OR</Or>
        </RegShapeUnderline>
      </RegitserShapeContainer>
      <Already>
        {typeCheck ? "i don't have account ?" : "already registered ?"}
        <Link onClick={handleAuthType}>{typeCheck ? "sign up" : "log in"}</Link>
      </Already>
    </div>
  );
}
