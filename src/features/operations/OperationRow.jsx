import styled from "styled-components";
import { format } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
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
import { useDeleteOperation } from "./useDeleteOperation";

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

function OperationRow({
  operation: {
    id: operationId,
    created_at,
    date,
    report,
    diseases,
    patients: { name: patientName, image },
    doctors: { name: doctorName },
    appointments: { startDate, numOfCons },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteOperation, isDeleting } = useDeleteOperation();

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
        <span>{report}</span>
      </Stacked>
      <Stacked>
        <span>{diseases}</span>
      </Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={operationId} />
          <Menus.List id={operationId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/operations/${operationId}`)}
            >
              See details
            </Menus.Button>

            {/* {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${operationId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(operationId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )} */}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete operation</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="operation"
            disabled={isDeleting}
            onConfirm={() => deleteOperation(operationId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default OperationRow;
