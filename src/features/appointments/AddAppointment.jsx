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

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddAppointment;
