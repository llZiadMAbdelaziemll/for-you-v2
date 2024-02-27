import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreateAppointment } from "./useCreateAppointment";
import { useEditAppointment } from "./useEditAppointment";
import { useUser } from "../authentication/useUser";
import { useDoctors } from "../doctors/useDoctors";
import Select from "../../ui/Select";

function CreateAppointmentForm({ appointmentToEdit = {}, onCloseModal }) {
  const { isCreating, createAppointment } = useCreateAppointment();
  const { isEditing, editAppointment } = useEditAppointment();
  const { user } = useUser();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = appointmentToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editAppointment(
        { newAppointmentData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createAppointment(
        { ...data, image: image },
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

      <FormRow label="Doctor" error={errors?.doctors?.name?.message}>
        {/* <Select
          options={[
            { value: "name-asc", label: "Sort by name (A-Z)" },
            { value: "name-desc", label: "Sort by name (Z-A)" },
            { value: "price-asc", label: "Sort by price (low first)" },
            { value: "price-desc", label: "Sort by price (high first)" },
            {
              value: "joiningDate-asc",
              label: "Sort by joining Date (recent first)",
            },
            {
              value: "joiningDate-desc",
              label: "Sort by joining Date (earlier first)",
            },
          ]}
        /> */}
        <Input
          type="text"
          id="doctors.name"
          disabled={isWorking}
          {...register("doctors.name", {
            required: "This field is required",
          })}
        />
      </FormRow>

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
