import Button from "../../ui/Button";
import CreateAppointmentForm from "./CreateAppointmentForm";
import Modal from "../../ui/Modal";

function AddAppointment() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="appointment-form">
          <Button>Book Appointment</Button>
        </Modal.Open>
        <Modal.Window name="appointment-form">
          <CreateAppointmentForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddAppointment;
