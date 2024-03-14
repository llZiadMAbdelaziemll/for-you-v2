import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdateUserRoleForm from "../features/authentication/UpdateUserRoleForm";
import { useUser } from "../features/authentication/useUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const userName = user?.user_metadata?.name;

  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
      <Row>
        <Heading as="h3">Update Role</Heading>
        <UpdateUserRoleForm />
      </Row>
    </>
  );
}

export default Account;
