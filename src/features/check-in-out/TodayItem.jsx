import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;
const Img = styled.img`
  width: 100%;
`;
const Patient = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, patients, numOfCons } = activity;
  console.log(patients);
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Coming</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      {/* <Flag src={patients.countryFlag} alt={`Flag of ${patients.country}`} /> */}
      <Img src={`${patients.image}`} alt=" " />

      <Patient>{patients.name}</Patient>
      {/* <div>{numOfCons} days</div> */}
      <div></div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton appointmentId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
