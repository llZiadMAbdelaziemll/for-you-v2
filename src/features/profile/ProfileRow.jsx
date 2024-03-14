import React from "react";
import Table from "../../ui/Table";
import styled from "styled-components";

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
const ProfileRow = ({ profile }) => {
  const {
    id,
    image,
    name,
    department,
    specialization,
    degree,
    mobile,
    email,
    price,
    joiningDate,
  } = profile;
  return (
    <Table.Row>
      {/* <Img src={image} alt="notfound" /> */}
      <Field>{name}</Field>
      <Field>{department}</Field>
      <Email>{email}</Email>
      {/* <Field>{specialization}</Field> */}
      {/* <Degree>{degree}</Degree>
    <Field>{mobile}</Field>

    
    <Amount>{formatCurrency(price)}</Amount>
    <Field>{format(new Date(joiningDate), "MMM dd yyyy")}</Field> */}

      {/* {userRole === "admin" && (
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
    )} */}
    </Table.Row>
  );
};

export default ProfileRow;
