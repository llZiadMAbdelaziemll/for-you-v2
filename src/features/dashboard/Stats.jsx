import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiUserGroup,
} from "react-icons/hi2";
import { FaUserInjured, FaHackerNewsSquare } from "react-icons/fa";
import { useUser } from "../authentication/useUser";
import Stat from "./Stat";

// const StyledStats = styled.div`
//   /* Box */
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   gap: 2rem;
// `;

function Stats({
  appointmentsCount,
  appointments,
  confirmedStays,
  numDays,
  doctorCount,
  recentPatientCount,
  allPatientsCount,
  todayPatientsCount,
}) {
  const { user } = useUser();
  const userRole = user.user_metadata.role;

  const sales = appointments?.reduce((acc, cur) => acc + cur.doctors?.price, 0);

  const checkins = confirmedStays?.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numOfCons, 0) /
    (numDays * doctorCount);
  // num checked in nights / all available nights (num days * num cabins)

  const todayPatients = todayPatientsCount?.length;
  return (
    <>
      <Stat
        title="Today Patients"
        color="blue"
        icon={<HiOutlineCalendarDays />}
        value={todayPatients}
      />
      <Stat
        title="Appointments"
        color="blue"
        icon={<FaHackerNewsSquare />}
        value={appointmentsCount}
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
        // value={formatCurrency(sales)}
        value={`$${sales}`}
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
