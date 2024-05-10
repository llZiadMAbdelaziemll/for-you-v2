import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDoctors } from "../../services/apiDoctors";
import { PAGE_SIZE } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";

export function useDoctors() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: doctors, count } = {},
    error,
  } = useQuery({
    queryKey: ["doctors", page],
    queryFn: () => getDoctors({ page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["doctors", page + 1],
      queryFn: () => getDoctors({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["doctors", page - 1],
      queryFn: () => getDoctors({ page: page - 1 }),
    });

  return { isLoading, error, doctors, count };
}
