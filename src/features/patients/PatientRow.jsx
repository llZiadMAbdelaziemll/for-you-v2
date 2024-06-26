import styled from "styled-components";
import { format } from "date-fns";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeletePatient } from "./useDeletePatient";
import { useCreatePatient } from "./useCreatePatient";
import { useUser } from "../authentication/useUser";
import CreatePatientForm from "./CreatePatientForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
  text-transform: capitalize;
`;

const BloodGroup = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-transform: upperCase;
`;

function PatientRow({ patient }) {
  const { user } = useUser();
  const { isDeleting, deletePatient } = useDeletePatient();
  const { isCreating, createPatient } = useCreatePatient();

  const userRole = user?.user_metadata?.role;
  const {
    id: patientId,
    image,
    name,
    gender,
    address,
    birthdate,
    mobile,
    bloodGroup,
    treatment,
  } = patient;
  function handleDuplicate() {
    createPatient({
      name: `Copy of ${name}`,
      gender,
      address,
      birthdate,
      mobile,
      bloodGroup,
      treatment,
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt="notfound" />
      <Field>{name}</Field>
      <Field>{gender}</Field>
      <BloodGroup>{bloodGroup}</BloodGroup>
      <Field>{address}</Field>

      <Field>{mobile}</Field>
      <Field>{format(new Date(birthdate), "MMM dd yyyy")}</Field>

      <Field>{treatment}</Field>

      {userRole === "admin" && (
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={patientId} />

              <Menus.List id={patientId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />} onClick={handleDuplicate}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />} onClick={handleDuplicate}>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreatePatientForm patientToEdit={patient} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="patients"
                  disabled={isDeleting}
                  onConfirm={() => deletePatient(patientId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      )}
    </Table.Row>
  );
}

export default PatientRow;
