import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getDoctorAppointmentsAfterDate } from "../../services/apiAppointments";

export function useRecentDoctorAppointments(userName) {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: appointments } = useQuery({
    queryFn: () => getDoctorAppointmentsAfterDate(userName, queryDate),
    queryKey: ["appointments", `last-${numDays}`, userName],
  });

  return { isLoading, appointments };
}
