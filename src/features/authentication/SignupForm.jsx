import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ name, email, password }) {
    signup(
      { name, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          inputType="regular"
          type="text"
          id="name"
          placeholder="Full name*"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow error={errors?.email?.message}>
        <Input
          inputType="regular"
          type="email"
          id="email"
          placeholder="Email address*"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.password?.message}>
        <Input
          inputType="regular"
          type="password"
          id="password"
          placeholder="Password (min 8 characters)"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.passwordConfirm?.message}>
        <Input
          inputType="regular"
          type="password"
          id="passwordConfirm"
          placeholder="Repeat password"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button variation="register" disabled={isLoading}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
