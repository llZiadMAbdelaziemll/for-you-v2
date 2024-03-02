import { useQuery } from "@tanstack/react-query";
import { getReports } from "../../services/apiReports";

export function useReports() {
  const {
    isLoading,
    data: reports,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return { isLoading, error, reports };
}
