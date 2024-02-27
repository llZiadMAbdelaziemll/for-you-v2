import Button from "../../ui/Button";
import CreateDoctorForm from "./CreateDoctorForm";
import Modal from "../../ui/Modal";

function AddDoctor() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="doctor-form">
          <Button>Add new doctor</Button>
        </Modal.Open>
        <Modal.Window name="doctor-form">
          <CreateDoctorForm />
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

export default AddDoctor;
