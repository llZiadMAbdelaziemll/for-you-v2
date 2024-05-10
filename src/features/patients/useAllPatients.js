import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";

export function useAllPatients() {
  const {
    isLoading,
    data: { data: patients } = {},
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  return { isLoading, error, patients };
}
