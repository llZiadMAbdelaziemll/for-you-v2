import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import PatientRow from "./PatientRow";
import { usePatients } from "./usePatients";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useUser } from "../authentication/useUser";
import { useDoctorAppointments } from "../appointments/useDoctorAppointments";

const TableTopic = styled.div`
  font-size: 17px;
  letter-spacing: 0.0125em;
  font-weight: 500;
  padding: 10px 15px;
`;

function PatientTable() {
  const { user } = useUser();
  const userRole = user.user_metadata.role;
  const userName = user.user_metadata.name;
  const { isLoading, patients } = usePatients();
  const [searchParams] = useSearchParams();
  const { doctorAppointments } = useDoctorAppointments(userName);

  // calculate doctor patients
  const doctorPatients = patients?.filter((patient) =>
    doctorAppointments?.some(
      (appointment) => appointment?.patients?.name === patient?.name
    )
  );

  if (isLoading) return <Spinner />;
  if (!patients.length) return <Empty resourceName="patients" />;

  // 1) FILTER
  const filterValue = searchParams.get("patientFilters") || "all";

  let filteredPatients;
  if (filterValue === "all") filteredPatients = patients;
  if (filterValue === "male")
    filteredPatients = patients.filter((patient) => patient.gender === "male");

  if (filterValue === "female")
    filteredPatients = patients.filter(
      (patient) => patient.gender === "female"
    );

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "birthdate-asc";
  const [field, direction] = sortBy.split("-");
  let sortedPatients;
  if (direction === "asc") {
    sortedPatients = filteredPatients.sort((a, b) =>
      a[field].localeCompare(b[field])
    );
  }
  if (direction === "desc") {
    sortedPatients = filteredPatients.sort((a, b) =>
      b[field].localeCompare(a[field])
    );
  }
  const finalPatients = userRole === "admin" ? sortedPatients : doctorPatients;
  return (
    <Menus>
      <Table columns="60px 130px  90px 70px 170px  130px 110px 150px 10px">
        <TableTopic>Patients</TableTopic>
        <Table.Header>
          <div>Image</div>
          <div>Name</div>
          <div>Gender</div>
          <div>Blood Group</div>
          <div>Address</div>
          <div>Mobile</div>
          <div>Birth Date</div>

          <div>Treatment</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={finalPatients}
          render={(patient) => (
            <PatientRow patient={patient} key={patient.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default PatientTable;
