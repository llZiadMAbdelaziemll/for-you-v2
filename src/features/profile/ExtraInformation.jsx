import React from "react";
import Table from "../../ui/Table";
import ProfileRow from "./ProfileRow";
import { useUser } from "../authentication/useUser";
import { useDoctors } from "../doctors/useDoctors";
import styled from "styled-components";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { useDoctorAppointments } from "../appointments/useDoctorAppointments";

const StyledExtraInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  /* padding: 1rem 2rem; */
  background-color: var(--color-grey-0);
`;
const InformationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.6rem 2.4rem;
`;
const Topic = styled.h4`
  text-transform: capitalize;
`;

const Value = styled.p``;
const ExtraInformation = ({ myObject }) => {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const userName = user?.user_metadata?.name;
  const { isLoading: doctorAppointmentsIsLoading, doctorAppointments } =
    useDoctorAppointments(userName);
  console.log(myObject);
  return (
    <StyledExtraInformation>
      <InformationRow>
        <Topic>specialization</Topic>
        <Value>{myObject?.specialization}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>department</Topic>
        <Value>{myObject?.department}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>degree</Topic>
        <Value>{myObject?.degree}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>price</Topic>
        <Value>{formatCurrency(myObject?.price)}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>appointments</Topic>
        <Value>{doctorAppointments?.length}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>mobile</Topic>
        <Value>{myObject?.mobile}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>email</Topic>
        <Value>{myObject?.email}</Value>
      </InformationRow>
      <InformationRow>
        <Topic>joining date</Topic>
        <Value>{format(new Date(myObject?.joiningDate), "MMM dd yyyy")}</Value>
      </InformationRow>
    </StyledExtraInformation>
  );
};

export default ExtraInformation;
