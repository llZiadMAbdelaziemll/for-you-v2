import styled from "styled-components";

import OperationDataBox from "./OperationDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
// import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useOperation } from "./useOperation";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteOperation } from "./useDeleteOperation";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function OperationDetail() {
  const { operation, isLoading } = useOperation();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteOperation, isDeleting } = useDeleteOperation();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!operation) return <Empty resourceName="operation" />;
  const { status, id: operationId } = operation;

  // const statusToTagName = {
  //   unconfirmed: "blue",
  //   "checked-in": "green",
  //   "checked-out": "silver",
  // };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Operation #{operationId}</Heading>
          {/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OperationDataBox operation={operation} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${operationId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(operationId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete operation</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="operation"
              disabled={isDeleting}
              onConfirm={() =>
                deleteOperation(operationId, {
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

export default OperationDetail;
