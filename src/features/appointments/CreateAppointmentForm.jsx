import { useForm, Controller } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreateAppointment } from "./useCreateAppointment";
import { useUpdateAppointment } from "./useUpdateAppointment";
import { useUser } from "../authentication/useUser";
import { useAllDoctors } from "../doctors/useAllDoctors";
import { usePatients } from "../patients/usePatients";
import Select from "../../ui/Select";
import { useReportsId } from "../reports/useReportsId";
import { useReport } from "../reports/useReport";
import { getToday } from "../../utils/helpers";

function CreateAppointmentForm({ appointmentToEdit = {}, onCloseModal }) {
  const { user } = useUser();
  const userName = user?.user_metadata?.name;
  const { isCreating, createAppointmentFn } = useCreateAppointment();
  const { isEditing, editAppointment } = useUpdateAppointment();
  const { doctors } = useAllDoctors();
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
    const newDoctor = doctors
      ?.filter((doctor) => {
        return doctor?.name == data?.doctors?.name;
      })
      ?.at(0);
    const { status, startDate } = data;

    if (isEditSession)
      editAppointment(
        {
          newAppointmentData: {
            doctor: newDoctor?.name,

            doctorId: newDoctor?.id,
          },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createAppointmentFn(
        {
          diagnosis: myObject?.report?.diagnosis,
          status: "unconfirmed",
          startDate: getToday(),
          name: myObject?.name,
          mobile: myObject?.mobile,
          doctor: newDoctor?.name,
          image: myObject?.image,
          gender: myObject?.gender,
          email: myObject?.email,
          isPaid: false,
          numOfCons: 0,
          patientId: myObject?.id,
          doctorId: newDoctor?.id,
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
      {/* <FormRow label="patient name" error={errors?.patients?.name?.message}>
        <Input
          type="text"
          id="patients.name"
          disabled={isWorking}
          {...register("patients.name", {
            required: "This field is required",
          })}
        />
      </FormRow> */}
      <FormRow label="Select Doctor" error={errors?.doctors?.name?.message}>
        <Controller
          name="doctors.name" // The name should match the key in your data object
          control={control}
          defaultValue="Dr.Ahmed El-Masry" // Set the default value as needed
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
      {/* <FormRow label="Mobile" error={errors?.patients?.mobile?.message}>
        <Input
          type="text"
          id="patients.mobile"
          disabled={isWorking}
          {...register("patients.mobile", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

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

      {/* <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

      {/* <FormRow label="Condition" error={errors?.condition?.message}>
        <Input
          type="text"
          id="condition"
          disabled={isWorking}
          {...register("condition", {
            required: "This field is required",
          })}
        />
      </FormRow> */}
      {/* <FormRow label="is paid" error={errors?.isPaid?.message}>
        <Input
          type="text"
          id="isPaid"
          disabled={isWorking}
          {...register("isPaid", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

      {/* <FormRow label="Status" error={errors?.status?.message}>
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
      </FormRow> */}

      {/* <FormRow label="Image" error={errors?.patients?.image?.message}>
        <FileInput
          id="patients.image"
          accept="patients.image/*"
          {...register("patients.image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow> */}

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
          {isEditSession ? "Edit appointment" : "Create new appointment"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateAppointmentForm;
