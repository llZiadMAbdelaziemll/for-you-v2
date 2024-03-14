import React from "react";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Records() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All appointments</Heading>
        {/* <AppointmentTableOperations /> */}
      </Row>
      <Row></Row>
    </>
  );
}
export default Records;
