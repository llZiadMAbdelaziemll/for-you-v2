import React from "react";
import Table from "./Table";
import { useUser } from "../features/authentication/useUser";
import { useDoctors } from "../features/doctors/useDoctors";

const ExtraInformation = () => {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const userName = user?.user_metadata?.name;
  const { doctors, isLoading } = useDoctors();
  const myObject = doctors?.filter((doctor) => {
    return userName === doctor?.name;
  });
  console.log(myObject);
  return (
    <Table columns="130px 300px">
      {/* <TableTopic>Patients</TableTopic> */}
      {/* <Table.Header>
    <div>Image</div>
    <div>Name</div>
    <div>Gender</div>
    <div>Blood Group</div>
    <div>Address</div>
    <div>Mobile</div>
    <div>Birth Date</div>

    <div>Treatment</div>
    <div></div>
  </Table.Header> */}
      <Table.Body
        data={finalPatients}
        render={(patient) => <PatientRow patient={patient} key={patient.id} />}
      />
    </Table>
  );
};

export default ExtraInformation;
