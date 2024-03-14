import React from "react";
import styled from "styled-components";

const StyledDiagnosis = styled.div`
  /* Box */
  /* background-color: var(--color-grey-0); */
  background: linear-gradient(to bottom, var(--color-grey-50), #1c86dc);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;
const Title = styled.h5`
  align-self: start;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 500;
`;
const Diagnosis = ({ value }) => {
  return (
    <StyledDiagnosis>
      <Title>Diagnosis</Title>
      <Value>{value}</Value>
    </StyledDiagnosis>
  );
};

export default Diagnosis;
