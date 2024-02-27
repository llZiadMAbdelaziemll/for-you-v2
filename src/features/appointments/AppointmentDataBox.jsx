import styled from "styled-components";
import { format } from "date-fns";

// import { box } from "../../ui/ErrorFallBack";
import { formatDistanceFromNow } from "../../utils/helpers";
import { isToday } from "date-fns/esm";
import { formatCurrency } from "../../utils/helpers";
import {
  // HiOutlineChatBubbleBottomCenterText,
  // HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import DataItem from "../../ui/DataItem";
// import { Flag } from "../../ui/Flag";

// const StyledAppointmentDataBox = styled.section`
//   ${box} /* padding: 3.2rem 4rem; */
//   overflow: hidden;
// `;

const Header = styled.header`
  background-color: var(--color-brand-500);
  /* padding: 2.4rem 4rem; */
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Patient = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  /* font-size: 1.8rem; */
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function AppointmentDataBox({ appointment }) {
  const {
    created_at,
    // condition,
    isPaid,
    startDate,
    endDate,
    // status,
    // numOfCons,
    email,
    patients: { name: patientName, image, gender, mobile },
    doctors: { name: doctorName, price },
  } = appointment;

  return (
    <section>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            nights in Cabin <span>{doctorName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Patient>
          {/* {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />} */}
          <p>
            {patientName}
            {/* {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""} */}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          {/* <p>National ID {nationalID}</p> */}
        </Patient>

        {/* {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )} */}

        {/* <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem> */}

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(price)}

            {/* {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`} */}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          appointmented {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </Footer>
    </section>
  );
}

export default AppointmentDataBox;
