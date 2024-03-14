import { useUserForRole } from "../features/authentication/useUserForRole";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useUser } from "../features/authentication/useUser";
import PatientDashboardLayout from "../features/dashboard/PatientDashBoardLayout";

function Dashboard() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
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

        {userRole !== "patient" && <DashboardFilter />}
      </Row>

      {userRole === "patient" ? (
        <PatientDashboardLayout />
      ) : (
        <DashboardLayout />
      )}
    </>
  );
}

export default Dashboard;
