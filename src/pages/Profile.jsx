import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BasicInformation from "../features/profile/BasicInformation";
import ExtraInformation from "../features/profile/ExtraInformation";
import { useUser } from "../features/authentication/useUser";
import { useAllDoctors } from "../features/doctors/useAllDoctors";

function Profile() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const userName = user?.user_metadata?.name;
  const { doctors } = useAllDoctors();
  const myObject = doctors
    ?.filter((doctor) => {
      return userName === doctor?.name;
    })
    .at(0);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Profile</Heading>
        {/* <AppointmentTableOperations /> */}
      </Row>
      <Row type="horizontal-top">
        <BasicInformation myObject={myObject} />
        <ExtraInformation myObject={myObject} />
      </Row>
    </>
  );
}
export default Profile;
