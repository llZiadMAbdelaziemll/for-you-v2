import { useQuery } from "@tanstack/react-query";
import { getReportsIds } from "../../services/apiReports";

export function useReportsId() {
  const {
    isLoading,
    data: reportsIds,
    error,
  } = useQuery({
    queryKey: ["reports-ids"],
    queryFn: getReportsIds,
  });

  return { isLoading, error, reportsIds };
}
