// import DoctorTable from "../features/doctors/DoctorTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import AddDoctor from "../features/doctors/AddDoctor";
import OperationTableOperations from "../features/operations/OperationTableOperations";
function Operations() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All appointments</Heading>
        <OperationTableOperations />
      </Row>
    </>
  );
}

export default Operations;
