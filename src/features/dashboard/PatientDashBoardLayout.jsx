import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { usePatients } from "../patients/usePatients";

import { useUser } from "../authentication/useUser";
import Stats from "./Stats";
import PatientStats from "./PatientStats";
import HeartChart from "./HeartChart";
import { useRecentStays } from "./useRecentStays";
import Welcome from "./Welcome";
import CreateReportForm from "../reports/CreateReportForm";
import AddReport from "../reports/AddReport";
import AddPatient from "../patients/AddPatient";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto 34rem;
  gap: 2.4rem;
`;

function PatientDashboardLayout() {
  const { user } = useUser();
  const userName = user?.user_metadata?.name;

  const { isLoading: isLoading1, patients: allPatients } = usePatients();
  const { isLoading: isLoading2, numDays } = useRecentStays();

  // calculate doctor patients
  const myProfile = allPatients?.filter(
    (patient) => patient?.name === userName
  );

  const report = myProfile?.at(0)?.reports;

  if (isLoading1 || isLoading2) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Welcome name={userName} />
      {report ? (
        <PatientStats report={report} />
      ) : (
        <>
          <AddReport />
          <AddPatient />
        </>
      )}
      {/* <HeartChart report={report} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}
// createPatient(
//   { ...data },
//   {
//     onSuccess: (data) => {
//       reset();
//       onCloseModal?.();
//     },
//   }
// )
export default PatientDashboardLayout;
