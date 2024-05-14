import { useForm } from "react-hook-form";
import { useEditReport } from "./useEditReport";
import { useUpdateAppointment } from "../appointments/useUpdateAppointment";
import { useEditPatient } from "../patients/useEditPatient";
import { useCreateReport } from "../reports/useCreateReport";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

function CreateReportForm({
  reportToEdit = {},
  appointment = {},
  onCloseModal,
}) {
  //   const { isCreating, createDoctor } = useCreateDoctor();
  const { isEditing, editReport } = useEditReport();
  const { isEditing: isEditing2, editAppointment } = useUpdateAppointment();
  const { isEditing: isEditing3, editPatient } = useEditPatient();
  const { isCreating, createReport } = useCreateReport();
  const isWorking = isEditing || isEditing2 || isEditing3 || isCreating;
  const { id: editId, ...editValues } = reportToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    console.log(editId);
    if (isEditSession) {
      editReport(
        { obj: data, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
      editPatient(
        {
          newPatientData: {
            name: appointment?.patients?.name,
            image: appointment?.patients?.image,
            report: data,
          },
          id: appointment?.patients?.id,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
      editAppointment(
        {
          id: appointment.id,
          newAppointmentData: {
            id: appointment?.id,
            name: appointment?.name,
            doctor: appointment?.doctor,
            report: data,
          },
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createReport(
        { ...data },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      //   type={onCloseModal ? "modal" : "regular"}
      type="modal"
    >
      <FormRow label="Heart Rate" error={errors?.heartRate?.message}>
        <Input
          type="number"
          id="heartRate"
          disabled={isWorking}
          {...register("heartRate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Systolic Pressure"
        error={errors?.systolicPressure?.message}
      >
        <Input
          type="number"
          id="systolicPressure"
          disabled={isWorking}
          {...register("systolicPressure", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Diastolic Pressure"
        error={errors?.diastolicPressure?.message}
      >
        <Input
          type="number"
          id="diastolicPressure"
          disabled={isWorking}
          {...register("diastolicPressure", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Temperature" error={errors?.temperature?.message}>
        <Input
          type="number"
          id="temperature"
          disabled={isWorking}
          {...register("temperature", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Weight" error={errors?.weight?.message}>
        <Input
          type="number"
          id="weight"
          disabled={isWorking}
          {...register("weight", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Medications" error={errors?.medications?.message}>
        <Input
          type="text"
          id="medications"
          disabled={isWorking}
          {...register("medications", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Symptoms" error={errors?.symptoms?.message}>
        <Input
          type="text"
          id="symptoms"
          disabled={isWorking}
          {...register("symptoms", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Followup date" error={errors?.followupDate?.message}>
        <Input
          type="date"
          id="followupDate"
          disabled={isWorking}
          {...register("followupDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Diagnosis" error={errors?.diagnosis?.message}>
        <Input
          type="text"
          id="diagnosis"
          disabled={isWorking}
          {...register("diagnosis", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        // style={{ gridGrow: 1 / -1 }}
        label="Notes"
        error={errors?.notes?.message}
      >
        <Input
          type="text"
          id="notes"
          disabled={isWorking}
          {...register("notes", {
            required: "This field is required",
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
          {isEditSession ? "Edit report" : "Create new report"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateReportForm;
