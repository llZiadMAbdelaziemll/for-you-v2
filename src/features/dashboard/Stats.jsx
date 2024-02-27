import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiUserGroup,
  HiFaceSmile,
} from "react-icons/hi2";
import { FaUserInjured } from "react-icons/fa";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import { useUser } from "../authentication/useUser";

const StyledStats = styled.div`
  /* Box */

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  column-gap: 2rem;
  row-gap: 2rem;
`;

function Stats({
  appointments,
  confirmedStays,
  numDays,
  doctorCount,
  recentPatientCount,
  allPatientsCount,
  todayPatientsCount,
}) {
  const { user } = useUser();
  let userRole = user.user_metadata.role;
  // 1.
  const numAppointments = appointments?.length;

  // 2.
  const sales = appointments?.reduce((acc, cur) => acc + cur.doctors?.price, 0);

  // 3.
  const checkins = confirmedStays?.length;

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numOfCons, 0) /
    (numDays * doctorCount);
  // num checked in nights / all available nights (num days * num cabins)
  // 5.
  const todayPatients = todayPatientsCount?.length;
  return (
    <>
      <Stat
        title="Today Patients"
        color="blue"
        icon={<HiFaceSmile />}
        value={todayPatients}
      />
      <Stat
        title="Appointments"
        color="blue"
        icon={<HiFaceSmile />}
        value={numAppointments}
      />
      <Stat
        title="Doctors"
        color="blue"
        icon={<HiUserGroup />}
        value={doctorCount}
      />

      <Stat
        title={`${userRole === "doctor" ? "My Patients" : "System Patients"} `}
        color="blue"
        icon={<FaUserInjured />}
        value={allPatientsCount}
      />

      {userRole === "admin" && (
        <Stat
          title="Recent Patients"
          color="blue"
          icon={<FaUserInjured />}
          value={recentPatientCount}
        />
      )}
      <Stat
        title={`${userRole === "doctor" ? "My Gain" : "Sales"}  `}
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />

      {userRole === "admin" && (
        <Stat
          title="Occupancy rate"
          color="yellow"
          icon={<HiOutlineChartBar />}
          value={Math.round(occupation * 100) + "%"}
        />
      )}
    </>
  );
}

export default Stats;
