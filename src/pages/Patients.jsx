import PatientTable from "../features/patients/PatientTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddPatient from "../features/patients/AddPatient";
import PatientTableOperations from "../features/patients/PatientTableOperations";
import { useUser } from "../features/authentication/useUser";

function Patients() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All patients</Heading>
        <PatientTableOperations />
      </Row>

      <Row>
        <PatientTable />
        {userRole === "patient" && <AddPatient />}
      </Row>
    </>
  );
}

export default Patients;
