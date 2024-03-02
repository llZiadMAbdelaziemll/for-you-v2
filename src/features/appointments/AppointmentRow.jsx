import styled from "styled-components";
import { format } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

// import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

// import { formatCurrency } from "../../utils/helpers";
// import { formatDistanceFromNow } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteAppointment } from "./useDeleteAppointment";
import CreateAppointmentForm from "./CreateAppointmentForm";

const Doctor = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function AppointmentRow({ appointment }) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteAppointment, isDeleting } = useDeleteAppointment();

  const {
    id: appointmentId,
    created_at,
    condition,
    startDate,
    endDate,
    isPaid,
    status,
    numOfCons,
    patients: { name: patientName, image, mobile },
    doctors: { name: doctorName },
  } = appointment;
  // const statusToTagName = {
  //   unconfirmed: "blue",
  //   "checked-in": "green",
  //   "checked-out": "silver",
  // };
  // console.log(condition, startDate, endDate, isPaid, status, numOfCons);
  return (
    <Table.Row>
      <img src={image} alt="notfound" />
      <Stacked>
        <span>{patientName}</span>
      </Stacked>

      <Stacked>
        <span>{mobile}</span>
      </Stacked>
      <Doctor>{doctorName}</Doctor>

      <Stacked>
        {/* <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          &rarr; {numOfCons}night stay
        </span> */}
        <span>
          {format(new Date(startDate), "MMM dd yyyy")}
          {/* &mdash; {format(new Date(endDate), "MMM dd yyyy")} */}
        </span>
      </Stacked>

      {/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}

      <Stacked>
        <span>{numOfCons}</span>
      </Stacked>
      <Stacked>
        <span>{condition}</span>
      </Stacked>
      <Stacked>
        <span>{isPaid?.toString()}</span>
      </Stacked>
      <Stacked>
        <span>{status}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={appointmentId} />
          <Menus.List id={appointmentId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/appointments/${appointmentId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${appointmentId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(appointmentId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete appointment</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <CreateAppointmentForm appointmentToEdit={appointment} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="appointment"
            disabled={isDeleting}
            onConfirm={() => deleteAppointment(appointmentId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default AppointmentRow;
