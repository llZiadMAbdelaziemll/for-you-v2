import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Description from "../../ui/Description";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
// import { RegisterAsk } from "../../ui/RegisterAsk";

// Email regex: /\S+@\S+\.\S+/
const RegitserShapeContainer = styled.div`
  width: 410px;
  margin: auto;
  margin-top: 10px;
  ${(props) =>
    props.screenWidth <= 480 &&
    css`
      max-width: 100%;
    `}
`;

const RegitserShape = styled.div`
  width: 100%;
  padding: 15px;
  background-color: var(--color-grey-50);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
`;

const RegShapeUnderline = styled.div`
  position: relative;
  text-align: center;
  margin-top: 20px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: -5px;
    width: 40%;
    border-bottom: solid 1px white;
  }
  &:before {
    left: 0;
  }

  &:after {
    right: 0%;
  }
`;

const Or = styled.span`
  position: absolute;
  top: -15px;
  left: 47%;
`;

const Already = styled.div`
  padding-top: 8px;
  font-size: 16px;
`;

const Link = styled.a`
  padding-left: 5px;
  cursor: pointer;
  color: var(--color-brand-600);

  &:hover {
    color: var(--color-brand-700);
  }
`;
function SignupForm({ screenWidth }) {
  const navigate = useNavigate();
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

  function handleHaveAcc(e) {
    e.preventDefault();
    navigate("/login");
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
      <RegitserShapeContainer screenWidth={screenWidth}>
        <RegitserShape>Register</RegitserShape>
        <RegShapeUnderline>
          <Or>OR</Or>
        </RegShapeUnderline>
      </RegitserShapeContainer>
      <Already>
        already registered ? <Link onClick={handleHaveAcc}>log in</Link>
      </Already>
    </Form>
  );
}

export default SignupForm;
