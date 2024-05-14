import React from "react";
import { useUser } from "../features/authentication/useUser";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useAllDoctors } from "../features/doctors/useAllDoctors";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BasicInformation from "../features/profile/BasicInformation";
import ExtraInformation from "../features/profile/ExtraInformation";

function Profile() {
  const { user } = useUser();
  const width = useScreenWidth();
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
      </Row>
      <Row type={`${width > 480 ? "horizontal-top" : "vertical"}`}>
        <BasicInformation myObject={myObject} />
        <ExtraInformation myObject={myObject} />
      </Row>
    </>
  );
}
export default Profile;
