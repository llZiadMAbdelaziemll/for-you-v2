import { useForm, Controller } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreateAppointment } from "./useCreateAppointment";
import { useUpdateAppointment } from "./useUpdateAppointment";
import { useUser } from "../authentication/useUser";
import { useDoctors } from "../doctors/useDoctors";
import { usePatients } from "../patients/usePatients";
import Select from "../../ui/Select";
import { useReportsId } from "../reports/useReportsId";
import { useReport } from "../reports/useReport";

function CreateAppointmentForm({ appointmentToEdit = {}, onCloseModal }) {
  const { user } = useUser();
  const userName = user?.user_metadata?.name;
  const { isCreating, createAppointmentFn } = useCreateAppointment();
  const { isEditing, editAppointment } = useUpdateAppointment();
  const { doctors } = useDoctors();
  const { patients } = usePatients();
  const { reportsIds, isLoading } = useReportsId();

  const myObject = patients
    ?.filter((patient) => {
      return patient.name === userName;
    })
    ?.at(0);
  const { report: myReport } = useReport(myObject?.reportId);

  console.log(myObject?.report);

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = appointmentToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, control, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  function onSubmit(data) {
    const newDoctorId = doctors
      ?.filter((doctor) => {
        return doctor?.name == data?.doctors?.name;
      })
      ?.at(0).id;
    const image = typeof data.image === "string" ? data.image : data.image[0];
    console.log(newDoctorId);
    const {
      condition,
      status,
      startDate,
      doctors: { name: doctorName },
      patients: { name: patientName, patientMobile },
    } = data;

    // if (isEditSession)
    //   editAppointment(
    //     { newAppointmentData: { ...data, image }, id: editId },
    //     {
    //       onSuccess: (data) => {
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
    // else
    createAppointmentFn(
      {
        condition,
        status,
        startDate,
        name: patientName,
        mobile: patientMobile,
        doctor: doctorName,
        image: image,
        patientId: myObject.id,
        doctorId: newDoctorId,
        report: myReport,
      },
      {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="patient name" error={errors?.patients?.name?.message}>
        <Input
          type="text"
          id="patients.name"
          disabled={isWorking}
          {...register("patients.name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Select Doctor">
        <Controller
          name="doctors.name" // The name should match the key in your data object
          control={control}
          defaultValue="Dr. Johnson" // Set the default value as needed
          render={({ field }) => {
            return (
              <Select
                options={doctors}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
          }}
        />
      </FormRow>
      <FormRow label="Mobile" error={errors?.patients?.mobile?.message}>
        <Input
          type="text"
          id="patients.mobile"
          disabled={isWorking}
          {...register("patients.mobile", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* <FormRow label="Doctor" error={errors?.doctors?.name?.message}>
        <Input
          type="text"
          id="doctors.name"
          disabled={isWorking}
          {...register("doctors.name", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Condition" error={errors?.condition?.message}>
        <Input
          type="text"
          id="condition"
          disabled={isWorking}
          {...register("condition", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="is paid" error={errors?.isPaid?.message}>
        <Input
          type="text"
          id="isPaid"
          disabled={isWorking}
          {...register("isPaid", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <Input
          type="text"
          id="status"
          disabled={isWorking}
          {...register("status", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit doctor" : "Create new doctor"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateAppointmentForm;
