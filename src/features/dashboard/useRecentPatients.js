import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getPatientsAfterDate } from "../../services/apiPatients";

export function useRecentPatients() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: patients } = useQuery({
    queryFn: () => getPatientsAfterDate(queryDate),
    queryKey: ["patients", `last-${numDays}`],
  });

  return { isLoading, patients };
}
