import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AppointmentTable from "../features/appointments/AppointmentTable";
import AppointmentTableOperations from "../features/appointments/AppointmentTableOperations";
import AddAppointment from "../features/appointments/AddAppointment";
import { useUser } from "../features/authentication/useUser";

function Appointments() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All appointments</Heading>
        <AppointmentTableOperations />
      </Row>
      <Row>
        <AppointmentTable />
        {userRole === "patient" && <AddAppointment />}
      </Row>
    </>
  );
}

export default Appointments;
