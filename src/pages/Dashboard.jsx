import { useUserForRole } from "../features/authentication/useUserForRole";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useUser } from "../features/authentication/useUser";

function Dashboard() {
  const { user } = useUser();
  // if (user?.user_metadata?.role === "doctor")
  //   return (
  //     <>
  //       <Row type="horizontal">
  //         <Heading as="h1">Dashboard</Heading>

  //         <DashboardFilter />
  //       </Row>

  //       <DashboardLayout />
  //     </>
  //   );

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>

        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
