import styled from "styled-components";

import AppointmentDataBox from "./AppointmentDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
// import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useAppointment } from "./useAppointment";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteAppointment } from "./useDeleteAppointment";
import Empty from "../../ui/Empty";
import Tag from "../../ui/Tag";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  @media (max-width: 480px) {
    gap: 1rem;

    & h1 {
      font-size: 2.2rem;
    }
    & span {
      font-size: 1rem;
      padding: 0.4rem 0.6rem;
      border-radius: 100px;
    }
  }
`;

function AppointmentDetail() {
  const { appointment, isLoading } = useAppointment();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteAppointment, isDeleting } = useDeleteAppointment();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!appointment) return <Empty resourceName="appointment" />;
  const { status, id: appointmentId } = appointment;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Appointment #{appointmentId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <AppointmentDataBox appointment={appointment} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${appointmentId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(appointmentId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete appointment</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="appointment"
              disabled={isDeleting}
              onConfirm={() =>
                deleteAppointment(appointmentId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default AppointmentDetail;
