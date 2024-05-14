import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { MiniProvider } from "./context/MiniContext";
import { useScreenWidth } from "./hooks/useScreenWidth";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";

import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Appointment from "./pages/Appointment";
import Checkin from "./pages/Checkin";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Records from "./pages/Records";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Signup from "./pages/Signup";
import Advanced from "./pages/Advanced";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const width = useScreenWidth();
  return (
    <DarkModeProvider>
      <MiniProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}

          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="login" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />

                <Route path="doctors" element={<Doctors />} />
                <Route path="patients" element={<Patients />} />
                <Route path="appointments" element={<Appointments />} />
                <Route
                  path="appointments/:appointmentId"
                  element={<Appointment />}
                />
                <Route path="checkin/:appointmentId" element={<Checkin />} />
                <Route path="records" element={<Records />} />
                <Route path="advanced" element={<Advanced />} />

                <Route path="users" element={<Users />} />

                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                // fontSize: "16px",
                fontSize: `${width > 480 ? "16px" : "14px"}`,
                maxWidth: "500px",
                // padding: "16px 24px",
                padding: `${width > 480 ? "16px 24px" : "15px 18px"}`,
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </MiniProvider>
    </DarkModeProvider>
  );
}

export default App;
