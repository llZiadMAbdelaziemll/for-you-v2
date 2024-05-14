import React from "react";
import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import { useDeleteDoctor } from "../doctors/useDeleteDoctor";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateDoctorForm from "../doctors/CreateDoctorForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

const StyledBasicInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  width: 28%;

  @media (max-width: 480px) {
    width: 100%;
    gap: 1.6rem;
  }
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

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;
const StyledButtons = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

const BasicInformation = ({ myObject }) => {
  const { user } = useUser();
  const { isDeleting, deleteDoctor } = useDeleteDoctor();

  const avatar = user?.user_metadata?.avatar;

  return (
    <StyledBasicInformation>
      <Img src={avatar} alt={myObject?.name} />
      <Content>
        <h2>
          {myObject?.name} #{myObject?.id}
        </h2>
        <div>{myObject?.specialization}</div>
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
