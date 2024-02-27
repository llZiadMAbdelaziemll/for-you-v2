import { useQuery } from "@tanstack/react-query";
import { getPatientAppointments } from "../../services/apiAppointments";

export function usePatientAppointments(userName) {
  const {
    isLoading,
    data: patientAppointments,
    error,
  } = useQuery({
    queryKey: ["patient-appointments", userName],
    queryFn: () => getPatientAppointments(userName),
    retry: false,
  });
  console.log(patientAppointments);
  return { isLoading, error, patientAppointments };
}
