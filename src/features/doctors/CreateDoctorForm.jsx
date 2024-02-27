import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreateDoctor } from "./useCreateDoctor";
import { useEditDoctor } from "./useEditDoctor";

function CreateDoctorForm({ doctorToEdit = {}, onCloseModal }) {
  const { isCreating, createDoctor } = useCreateDoctor();
  const { isEditing, editDoctor } = useEditDoctor();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = doctorToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editDoctor(
        { newDoctorData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createDoctor(
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
      <FormRow label="doctor name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Department" error={errors?.department?.message}>
        <Input
          type="text"
          id="department"
          disabled={isWorking}
          {...register("department", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Specialization" error={errors?.specialization?.message}>
        <Input
          type="text"
          id="specialization"
          disabled={isWorking}
          {...register("specialization", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Degree" error={errors?.degree?.message}>
        <Input
          type="text"
          id="degree"
          disabled={isWorking}
          {...register("degree", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Mobile" error={errors?.mobile?.message}>
        <Input
          type="text"
          id="mobile"
          disabled={isWorking}
          {...register("mobile", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Joining date" error={errors?.joiningDate?.message}>
        <Input
          type="date"
          id="joiningDate"
          disabled={isWorking}
          {...register("joiningDate", {
            required: "This field is required",
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

export default CreateDoctorForm;
