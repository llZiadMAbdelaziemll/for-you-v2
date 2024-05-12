import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BasicInformation from "../features/profile/BasicInformation";
import ExtraInformation from "../features/profile/ExtraInformation";
import { useUser } from "../features/authentication/useUser";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useAllDoctors } from "../features/doctors/useAllDoctors";

function Profile() {
  const { user } = useUser();
  const width = useScreenWidth();
  const userRole = user?.user_metadata?.role;
  const userName = user?.user_metadata?.name;
  const { doctors } = useAllDoctors();
  const myObject = doctors
    ?.filter((doctor) => {
      return userName === doctor?.name;
    })
    .at(0);
  // @media (max-width: 480px) {
  //   grid-template-columns: 1fr;
  //   width: 30rem;
  //   max-height: 70vh;
  //   gap: 0.35rem;
  //   overflow-y: scroll;
  //   ::-webkit-scrollbar {
  //     display: none;
  //   }
  // }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">My Profile</Heading>
        {/* <AppointmentTableOperations /> */}
      </Row>
      {/* type={`${width > 480 ? "horizontal-top" : "vertical"}`} */}
      <Row type={`${width > 480 ? "horizontal-top" : "vertical"}`}>
        <BasicInformation myObject={myObject} />
        <ExtraInformation myObject={myObject} />
      </Row>
    </>
  );
}
export default Profile;
