import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserRoleForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      user_metadata: { role: currentRole },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [role, setRole] = useState(currentRole);

  function handleSubmit(e) {
    e.preventDefault();
    if (!role) return;
    updateUser(
      { role },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setRole(currentRole);
  }

  return (
    <Form type="account" onSubmit={handleSubmit}>
      <FormRow label="Role">
        <Input
          inputType="regular"
          type="text"
          value={role}
          placeholder={role}
          onChange={(e) => setRole(e.target.value)}
          id="role"
          disabled={isUpdating || currentRole !== "admin"}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserRoleForm;
