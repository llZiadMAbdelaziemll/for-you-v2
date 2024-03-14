import styled from "styled-components";
import { format } from "date-fns";

import CreateDoctorForm from "./CreateDoctorForm";
import { useDeleteDoctor } from "./useDeleteDoctor";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateDoctor } from "./useCreateDoctor";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useUser } from "../authentication/useUser";

const Img = styled.img`
  display: block;
  width: 33px;
  height: 33px;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;

  border-radius: 5px;
`;

const Field = styled.div`
  font-size: 14px;
  font-weight: 400;
  // color: var(--color-grey-600);
  // font-family: "Sono";
  text-transform: capitalize;
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-transform: upperCase;
`;
const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
const Email = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-transform: lowerCase;
`;

function DoctorRow({ doctor }) {
  const { isDeleting, deleteDoctor } = useDeleteDoctor();
  const { isCreating, createDoctor } = useCreateDoctor();
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;

  const {
    id: doctorId,
    image,
    name,
    department,
    specialization,
    degree,
    mobile,
    email,
    price,
    joiningDate,
  } = doctor;
  function handleDuplicate() {
    createDoctor({
      name: `Copy of ${name}`,
      department,
      specialization,
      degree,
      mobile,
      email,
      price,
      joiningDate,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt="notfound" />
      <Field>{name}</Field>
      <Field>{department}</Field>
      {/* <Field>{specialization}</Field> */}
      <Degree>{degree}</Degree>
      <Field>{mobile}</Field>

      <Email>{email}</Email>
      <Amount>{formatCurrency(price)}</Amount>
      <Field>{format(new Date(joiningDate), "MMM dd yyyy")}</Field>

      {userRole === "admin" && (
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={doctorId} />

              <Menus.List id={doctorId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateDoctorForm doctorToEdit={doctor} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="doctors"
                  disabled={isDeleting}
                  onConfirm={() => deleteDoctor(doctorId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      )}
    </Table.Row>
  );
}

export default DoctorRow;
