import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOperation } from "../../services/apiOperations";

export function useAppointment() {
  const { operationId } = useParams();

  const {
    isLoading,
    data: operation,
    error,
  } = useQuery({
    queryKey: ["operation", operationId],
    queryFn: () => getOperation(operationId),
    retry: false,
  });

  return { isLoading, error, operation };
}
