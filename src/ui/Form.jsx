import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "account" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
    `}
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      padding-bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
      /* Box */
      background-color: var(--color-grey-0);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;

      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      width: 80rem;
      @media (max-width: 480px) {
        grid-template-columns: 1fr;
        width: 30rem;
        max-height: 70vh;
        gap: 0.35rem;
        overflow-y: scroll;
        ::-webkit-scrollbar {
          display: none;
        }
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};
export default Form;
