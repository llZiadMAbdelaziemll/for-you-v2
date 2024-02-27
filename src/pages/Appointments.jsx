import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AppointmentTable from "../features/appointments/AppointmentTable";
import AppointmentTableOperations from "../features/appointments/AppointmentTableOperations";
import AddAppointment from "../features/appointments/AddAppointment";

function Appointments() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All appointments</Heading>
        <AppointmentTableOperations />
      </Row>
      <Row>
        <AppointmentTable />
        <AddAppointment />
      </Row>
    </>
  );
}

export default Appointments;
