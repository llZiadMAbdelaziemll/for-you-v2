import DoctorTable from "../features/doctors/DoctorTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddDoctor from "../features/doctors/AddDoctor";
import DoctorTableOperations from "../features/doctors/DoctorTableOperations";
import { useUser } from "../features/authentication/useUser";
function Doctors() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Doctors</Heading>
        <DoctorTableOperations />
      </Row>

      <Row>
        <DoctorTable />
        {userRole === "admin" && <AddDoctor />}
      </Row>
    </>
  );
}

export default Doctors;
