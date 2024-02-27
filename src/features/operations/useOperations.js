import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOperations } from "../../services/apiOperations";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useOperations() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: operations, count } = {},
    error,
  } = useQuery({
    queryKey: ["operations", filter, sortBy, page],
    queryFn: () => getOperations({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["operations", filter, sortBy, page + 1],
      queryFn: () => getOperations({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["operations", filter, sortBy, page - 1],
      queryFn: () => getOperations({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, operations, count };
}
