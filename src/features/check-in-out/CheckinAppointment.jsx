import styled from "styled-components";
import AppointmentDataBox from "../../features/appointments/AppointmentDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useAppointment } from "../appointments/useAppointment";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { useUser } from "../authentication/useUser";
import Modal from "../../ui/Modal";
import CreateReportForm from "../reports/CreateReportForm";
// import CreateReportForm from "../reports/CreateReportForm";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  @media (max-width: 480px) {
    padding: 2rem 2rem;
    font-size: 1.45rem;
    & input[type="checkbox"] {
      height: 1.8rem;
      width: 1.8rem;
    }
  }
`;

function CheckinAppointment() {
  const { user } = useUser();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { appointment, isLoading } = useAppointment();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmPaid(appointment?.isPaid ?? false), [appointment]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const userRole = user?.user_metadata?.role;
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: appointmentId,
    patients: { name, reports },
    doctors,

    numOfCons,
  } = appointment;
  console.log(reports);
  // const optionalBreakfastPrice =
  //   settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    checkin({ appointmentId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{appointmentId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <AppointmentDataBox appointment={appointment} />
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {name} has paid the total amount of
          {formatCurrency(doctors.price)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in appointment #{appointmentId}
        </Button>
        {userRole === "doctor" && (
          <div>
            <Modal>
              <Modal.Open opens="report-form">
                <Button>Edit Report</Button>
              </Modal.Open>
              <Modal.Window name="report-form">
                <CreateReportForm
                  reportToEdit={reports}
                  appointment={appointment}
                />
              </Modal.Window>
            </Modal>
          </div>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinAppointment;
