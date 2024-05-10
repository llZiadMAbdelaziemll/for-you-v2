import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function usePatients() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: patients, count } = {},
    error,
  } = useQuery({
    queryKey: ["patients", page],
    queryFn: () => getPatients({ page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["patients", page + 1],
      queryFn: () => getPatients({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["patients", page - 1],
      queryFn: () => getPatients({ page: page - 1 }),
    });
  return { isLoading, error, patients, count };
}
