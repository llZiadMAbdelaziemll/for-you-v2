import styled, { css } from "styled-components";

const Input = styled.input`
  ${(props) =>
    props.inputType === "regular" &&
    css`
      width: 41rem;
      height: 5.68rem;
      justify-content: center;
      @media (max-width: 394px) {
        height: 5.28rem;
      }
    `}

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  ${(props) =>
    props.inputType === "modal" &&
    css`
      width: 100%;
    `}
  @media (max-width: 480px) {
    padding: 0.7rem 1.2rem;
  }
`;
Input.defaultProps = {
  inputType: "modal",
};
export default Input;
