import { useUser } from "../features/authentication/useUser";
import AppointmentTable from "../features/appointments/AppointmentTable";
import AppointmentTableOperations from "../features/appointments/AppointmentTableOperations";
import AddAppointment from "../features/appointments/AddAppointment";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Appointments() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">appointments</Heading>
        {!(userRole === "patient") && <AppointmentTableOperations />}
      </Row>
      <Row>
        <AppointmentTable />
        {userRole === "patient" && <AddAppointment />}
      </Row>
    </>
  );
}

export default Appointments;
