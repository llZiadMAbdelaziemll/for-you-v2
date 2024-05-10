import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import { useRecentAppointments } from "./useRecentAppointments";
import { useRecentPatients } from "./useRecentPatients";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useAllDoctors } from "../doctors/useAllDoctors";
import { usePatients } from "../patients/usePatients";
import SalesChart from "./SalesChart";
import PatientSurvayChart from "./PatientSurvayChart";
import DurationChart from "./DurationChart";
import GenderChart from "./GenderChart";
import TodayActivity from "../check-in-out/TodayActivity";
import { useUser } from "../authentication/useUser";
import { useRecentDoctorAppointments } from "./useRecentDoctorAppointments";
import { useDoctorAppointments } from "../appointments/useDoctorAppointments";
import { useAppointments } from "../appointments/useAppointments";
import { useTodayPatients } from "./useTodayPatients";
import { useAllPatients } from "../patients/useAllPatients";
import BloodGroupChart from "./BloodGroupChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto 34rem auto;
  gap: 2.4rem;
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto 34rem auto;
  }
`;

function DashboardLayout() {
  const { appointments: allAppointments, isLoading: isLoading1 } =
    useRecentAppointments();
  const { count: appointmentsCount } = useAppointments();
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const userName = user?.user_metadata?.name;
  const { isLoading: isLoading3, doctors } = useAllDoctors();
  const {
    isLoading: isLoading5,
    patients: allPatients,
    count: patientsCount,
  } = usePatients();
  const { isLoading: isLoading7, patients } = useAllPatients();

  const {
    isLoading: recentDoctorAppointmentsIsLoading,
    appointments: recentDoctorAppointments,
  } = useRecentDoctorAppointments(userName);
  console.log(recentDoctorAppointments);
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  const { patients: recentPatients, isLoading: isLoading4 } =
    useRecentPatients();

  const { doctorAppointments } = useDoctorAppointments(userName);

  const { patients: todayPatients, isLoading: isLoading6 } = useTodayPatients();

  // calculate doctor patients
  const doctorPatients = patients?.filter((patient) =>
    doctorAppointments?.some(
      (appointment) => appointment?.patients?.name === patient?.name
    )
  );
  console.log(doctorPatients);
  const doctorTodayPatients = todayPatients?.filter((patient) =>
    doctorPatients?.some((appointment) => appointment?.name === patient?.name)
  );

  const doctorConfirmedStays = confirmedStays?.filter((patient) =>
    doctorPatients?.some((check) => check?.name === patient?.name)
  );

  const finalConfirmedStays =
    userRole === "admin" ? confirmedStays : doctorConfirmedStays;
  console.log(finalConfirmedStays);

  const finalAppointments =
    userRole === "admin" ? allAppointments : recentDoctorAppointments;
  const finalAppointmentsCount =
    userRole === "admin" ? appointmentsCount : doctorAppointments?.length;
  const finalAllPatients =
    userRole === "admin" ? patientsCount : doctorPatients?.length;
  const finalTodayPatients =
    userRole === "admin" ? todayPatients : doctorTodayPatients;

  if (
    isLoading1 ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    isLoading6
  )
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        appointmentsCount={finalAppointmentsCount}
        appointments={finalAppointments}
        confirmedStays={finalConfirmedStays}
        numDays={numDays}
        doctorCount={doctors?.length}
        recentPatientCount={recentPatients.length}
        allPatientsCount={finalAllPatients}
        todayPatientsCount={finalTodayPatients}
      />
      <TodayActivity />

      {userRole === "admin" ? (
        <>
          <DurationChart confirmedStays={confirmedStays} />
          <SalesChart appointments={allAppointments} numDays={numDays} />
        </>
      ) : (
        <>
          {/* <GenderChart doctorPatients={doctorPatients} numDays={numDays} /> */}
          <BloodGroupChart doctorPatients={doctorPatients} />
          <PatientSurvayChart
            allPatients={patients}
            doctorPatients={doctorPatients}
            numDays={numDays}
          />
        </>
      )}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
