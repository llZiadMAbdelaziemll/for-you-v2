import AppointmentRow from "./AppointmentRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import { useAppointments } from "./useAppointments";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { useDoctorAppointments } from "./useDoctorAppointments";
import { usePatientAppointments } from "./usePatientAppointments";
import { useUser } from "../authentication/useUser";

function AppointmentTable() {
  const { appointments, isLoading, count } = useAppointments();
  const { user } = useUser();
  console.log(user);
  const { isLoading: doctorAppointmentsIsLoading, doctorAppointments } =
    useDoctorAppointments(user?.user_metadata?.name);
  const { isLoading: patientAppointmentsIsLoading, patientAppointments } =
    usePatientAppointments(user?.user_metadata?.name);
  console.log(count);

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!appointments.length) return <Empty resourceName="appointments" />;

  // 1) FILTER
  const filterValue = searchParams.get("appointmentsFilters") || "all";
  console.log(appointments.doctors);
  let filteredAppointments;
  if (filterValue === "all") filteredAppointments = appointments;
  if (filterValue === "checked-in")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.status === "checked-in"
    );

  if (filterValue === "checked-out")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.status === "checked-out"
    );
  if (filterValue === "unconfirmed")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.status === "unconfirmed"
    );
  if (filterValue === "male")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.patients.gender === "male"
    );

  if (filterValue === "female")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.patients.gender === "female"
    );
  if (filterValue === "severe")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.condition === "severe"
    );

  if (filterValue === "mild")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.condition === "mild"
    );

  if (filterValue === "moderate")
    filteredAppointments = appointments.filter(
      (appointment) => appointment.condition === "moderate"
    );
  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");

  let sortedAppointments;
  if (field === "name") {
    if (direction === "asc") {
      sortedAppointments = filteredAppointments.sort((a, b) =>
        a.patients[field].localeCompare(b.patients[field])
      );
    }
    if (direction === "desc") {
      sortedAppointments = filteredAppointments.sort((a, b) =>
        b.patients[field].localeCompare(a.patients[field])
      );
    }
  }
  if (field === "startDate") {
    if (direction === "asc") {
      sortedAppointments = filteredAppointments.sort((a, b) =>
        a[field].localeCompare(b[field])
      );
    }
    if (direction === "desc") {
      sortedAppointments = filteredAppointments.sort((a, b) =>
        b[field].localeCompare(a[field])
      );
    }
  }
  // console.log(sortedAppointments);
  const data =
    user?.user_metadata?.role === "doctor"
      ? doctorAppointments
      : user?.user_metadata?.role === "patient"
      ? patientAppointments
      : sortedAppointments;
  return (
    <Menus>
      <Table columns="60px 120px 120px 120px 120px 80px 100px 70px 90px 10px">
        <Table.Header>
          <div>Image</div>
          <div>Name</div>

          <div>Mobile</div>
          <div>Doctor</div>
          <div>Start date</div>
          <div>duration</div>
          <div>Condition</div>
          {/* <div>Email</div> */}
          <div>is paid</div>
          <div>Status</div>
          <div></div>
        </Table.Header>
        {/* `${
            user?.user_metadata?.role === "doctor"
              ? `${doctorAppointments}`
              : `${sortedAppointments}`
          } ` */}
        <Table.Body
          data={data}
          render={(appointment) => (
            <AppointmentRow key={appointment?.id} appointment={appointment} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default AppointmentTable;
