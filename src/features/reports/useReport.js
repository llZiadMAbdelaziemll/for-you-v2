import { useQuery } from "@tanstack/react-query";
import { getReport } from "../../services/apiReports";

export function useReport(reportId) {
  const {
    isLoading,
    data: report,
    error,
  } = useQuery({
    queryKey: ["report"],
    queryFn: () => getReport(reportId),
    retry: false,
  });

  return { isLoading, error, report };
}
