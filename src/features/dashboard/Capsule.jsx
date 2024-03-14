import React from "react";
import styled from "styled-components";
const StyledCapsule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
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
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 500;
`;
const Capsule = ({ title, value }) => {
  return (
    <StyledCapsule>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledCapsule>
  );
};

export default Capsule;
