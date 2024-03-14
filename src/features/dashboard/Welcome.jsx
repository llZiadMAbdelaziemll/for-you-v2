import React from "react";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Row from "../../ui/Row";
import { useUser } from "../authentication/useUser";
import { usePatients } from "../patients/usePatients";
import Diagnosis from "./Diagnosis";

const StyledSurvayChart = styled.div`
  display: flex;
  gap: 2.4rem;
  grid-column: 1 / -1;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
const Image = styled.img``;

const Content = styled.div`
  font-size: Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const WelcomeBack = styled.h5`
  letter-spacing: 0.026em;
  font-size: 16px;
  font-weight: 500 !important;
`;
const Name = styled.h2`
  color: #2196f3 !important;
  font-size: 25px;
  letter-spacing: 0.03125em;
  font-weight: 500;
`;

const Text = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #96a2b4;
`;
function Welcome({ name }) {
  const { user } = useUser();
  const userName = user?.user_metadata?.name;

  const { isLoading: isLoading1, patients: allPatients } = usePatients();

  // calculate doctor patients
  const myProfile = allPatients?.filter(
    (patient) => patient?.name === userName
  );

  const report = myProfile?.at(0)?.reports;
  return (
    <StyledSurvayChart>
      <Image src="/welcome.png" />
      <Content>
        <Row type="horizontal">
          <div>
            <WelcomeBack>Welcome back</WelcomeBack>
            <Name>{name}!</Name>
          </div>
          <Diagnosis value={`${report ? `${report?.diagnosis}` : "none"}`} />
        </Row>
        <Text>
          We would like to take this opportunity to welcome you to our practice
          and to thank you for choosing our physicians to participate in your
          healthcare. We look forward to providing you with personalized,
          comprehensive health care focusing on wellness and prevention.
        </Text>
      </Content>
    </StyledSurvayChart>
  );
}
export default Welcome;
