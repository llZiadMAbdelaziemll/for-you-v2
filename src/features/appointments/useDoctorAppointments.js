import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointments } from "../../services/apiAppointments";

export function useDoctorAppointments(userName) {
  const {
    isLoading,
    data: doctorAppointments,
    error,
  } = useQuery({
    queryKey: ["doctor-appointments", userName],
    queryFn: () => getDoctorAppointments(userName),
    retry: false,
  });
  return { isLoading, error, doctorAppointments };
}
