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
import { RiHotelBedLine } from "react-icons/ri";

const Header = styled.header`
  background-color: var(--color-brand-500);
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
  @media (max-width: 480px) {
    padding: 1.5rem 2rem;

    svg {
      height: 2.6rem;
      width: 2.6rem;
    }

    & div:first-child {
    }
    & p {
      font-size: 1.4rem;
    }
    & span {
      font-size: 1.4rem;
    }
    & p.end {
      text-align: end;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
  @media (max-width: 480px) {
    padding: 4rem 1rem 1.2rem;
  }
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
  @media (max-width: 480px) {
    flex-wrap: wrap;
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

  @media (max-width: 480px) {
    padding: 1rem 1rem;
    & div {
      font-size: 1.4rem;
    }
    & p:last-child {
      font-size: 1.2rem;
    }
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
  @media (max-width: 480px) {
    padding: 0.6rem 1rem 1.4rem;
  }
`;
const Img = styled.img`
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;
function AppointmentDataBox({ appointment }) {
  const {
    created_at,
    // condition,
    isPaid,
    startDate,
    endDate,
    // status,
    numOfCons,
    email,
    patients: { name: patientName, image, gender, mobile },
    doctors: { name: doctorName, price },
  } = appointment;

  return (
    <section>
      <Header>
        <div>
          <RiHotelBedLine />
          <p>
            (
            {isToday(new Date(startDate))
              ? "just Today"
              : formatDistanceFromNow(startDate)}
            ) with <span>{doctorName}</span>
          </p>
        </div>
        <p className="end">{format(new Date(startDate), "EEE, MMM dd yyyy")}</p>

        {/* <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p> */}
      </Header>

      <Section>
        <Patient>
          <Img src={image} alt="notfound" />

          <p>{patientName}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>{mobile}</p>
        </Patient>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(price)}
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
