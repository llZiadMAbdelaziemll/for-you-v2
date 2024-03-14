import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreatePatient } from "./useCreatePatient";
import { useEditPatient } from "./useEditPatient";
import { useReports } from "../reports/useReports";
import { useReportsId } from "../reports/useReportsId";
import { useReport } from "../reports/useReport";
import { useUpdateUser } from "../authentication/useUpdateUser";
import { useState } from "react";

function CreatePatientForm({ patientToEdit = {}, onCloseModal }) {
  const { isCreating, createPatient } = useCreatePatient();
  const { isEditing, editPatient } = useEditPatient();
  const { reportsIds, isLoading } = useReportsId();
  const { updateUser, isUpdating } = useUpdateUser();
  const newReportId = reportsIds?.at(-1)?.id;

  const report = useReport(newReportId)?.report;
  // const newReport = report(newReportId);
  console.log(report);
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = patientToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editPatient(
        { newPatientData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
      // updateUser({ avatar: image, name: data?.name });
    } else {
      createPatient(
        { ...data, image: image, reportId: newReportId, report: report },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
      updateUser({ avatar: image, name: data?.name });
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="patient name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Gender" error={errors?.gender?.message}>
        <Input
          type="text"
          id="gender"
          disabled={isWorking}
          {...register("gender", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          disabled={isWorking}
          {...register("address", {
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

      <FormRow label="Birth Date" error={errors?.birthdate?.message}>
        <Input
          type="text"
          id="birthdate"
          disabled={isWorking}
          {...register("birthdate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Blood Group" error={errors?.bloodGroup?.message}>
        <Input
          type="text"
          id="bloodGroup"
          disabled={isWorking}
          {...register("bloodGroup", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Treatment" error={errors?.treatment?.message}>
        <Input
          type="text"
          id="treatment"
          disabled={isWorking}
          {...register("treatment", {
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
      {/* <FormRow> */}
      {/* type is an HTML attribute! */}
      <Button
        variation="secondary"
        type="reset"
        onClick={() => onCloseModal?.()}
      >
        Cancel
      </Button>
      <Button disabled={isWorking}>
        {isEditSession ? "Edit patient" : "Create new patient"}
      </Button>
      {/* </FormRow> */}
    </Form>
  );
}

export default CreatePatientForm;
