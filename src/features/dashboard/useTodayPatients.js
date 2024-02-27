import { useQuery } from "@tanstack/react-query";
import { getTodayPatients } from "../../services/apiPatients";

export function useTodayPatients() {
  const { isLoading, data: patients } = useQuery({
    queryFn: getTodayPatients,
    queryKey: ["today-patients"],
  });

  return { isLoading, patients };
}
