import DoctorTable from "../features/doctors/DoctorTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddDoctor from "../features/doctors/AddDoctor";
import DoctorTableOperations from "../features/doctors/DoctorTableOperations";
function Doctors() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All doctors</Heading>
        <DoctorTableOperations />
      </Row>

      <Row>
        <DoctorTable />
        <AddDoctor />
      </Row>
    </>
  );
}

export default Doctors;
