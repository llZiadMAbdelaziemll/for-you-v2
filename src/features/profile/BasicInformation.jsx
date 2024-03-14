import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useUser } from "../authentication/useUser";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import AddDoctor from "../doctors/AddDoctor";
import CreateDoctorForm from "../doctors/CreateDoctorForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteDoctor } from "../doctors/useDeleteDoctor";

const StyledBasicInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  width: 28%;
`;

const Img = styled.img`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  gap: 1rem;
  text-align: center;
`;
const StyledButtons = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;
const Name = styled.h2``;
const Description = styled.div``;
const BasicInformation = ({ myObject }) => {
  const { user } = useUser();
  const { isDeleting, deleteDoctor } = useDeleteDoctor();

  const avatar = user?.user_metadata?.avatar;
  // const name = user?.user_metadata?.name;
  return (
    <StyledBasicInformation>
      <Img src={avatar} alt={myObject?.name} />
      <Content>
        <Name>
          {myObject?.name} #{myObject?.id}
        </Name>
        <Description>{myObject?.specialization}</Description>
      </Content>
      <StyledButtons>
        <Modal>
          <Modal.Open opens="edit">
            <Button size="large">Edit My Profile</Button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateDoctorForm doctorToEdit={myObject} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="delete">
            <Button size="large">Delete</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="my profile"
              disabled={isDeleting}
              onConfirm={() => deleteDoctor(myObject?.id)}
            />
          </Modal.Window>
        </Modal>
      </StyledButtons>
    </StyledBasicInformation>
  );
};

export default BasicInformation;
