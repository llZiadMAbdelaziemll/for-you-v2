import styled from "styled-components";
import { usePatients } from "../patients/usePatients";
import { useUser } from "../authentication/useUser";
import { useRecentStays } from "./useRecentStays";
import Welcome from "./Welcome";
import AddReport from "../reports/AddReport";
import AddPatient from "../patients/AddPatient";
import PatientStats from "./PatientStats";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto 34rem;
  gap: 2.4rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
  }
`;

const FirstOrder = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  gap: 1rem;
  & p {
    color: #96a2b4;
  }
`;
const Span = styled.span`
  display: block;
  font-size: 1.8rem;
  color: var(--color-red-700);
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
          <FirstOrder>
            <p>
              <Span>First !</Span> You must fill your last report for store your
              report information
            </p>
            <AddReport />
          </FirstOrder>

          <FirstOrder>
            <p>
              <Span>SECOND !</Span>
              After you filled your report You must fill your information for
              store it
            </p>
            <AddPatient />
          </FirstOrder>
        </>
      )}
    </StyledDashboardLayout>
  );
}

export default PatientDashboardLayout;
