import PatientTable from "../features/patients/PatientTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddPatient from "../features/patients/AddPatient";
import PatientTableOperations from "../features/patients/PatientTableOperations";

function Patients() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All patients</Heading>
        <PatientTableOperations />
      </Row>

      <Row>
        <PatientTable />
        <AddPatient />
      </Row>
    </>
  );
}

export default Patients;
