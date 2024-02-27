import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";

export function usePatients() {
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return { isLoading, error, patients };
}
