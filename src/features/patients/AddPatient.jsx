import Button from "../../ui/Button";
import CreatePatientForm from "./CreatePatientForm";
import Modal from "../../ui/Modal";

function AddPatient() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="patient-form">
          <Button>Add new patient</Button>
        </Modal.Open>
        <Modal.Window name="patient-form">
          <CreatePatientForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddPatient() {
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

export default AddPatient;
