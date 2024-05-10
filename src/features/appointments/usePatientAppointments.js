import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatientAppointments } from "../../services/apiAppointments";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function usePatientAppointments(userName) {
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

  // Query
  const {
    isLoading,
    data: { data: patientAppointments, count } = {},
    error,
  } = useQuery({
    queryKey: ["patient-appointments", userName, filter, sortBy, page],
    queryFn: () => getPatientAppointments(userName, { filter, sortBy, page }),
    retry: false,
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["patient-appointments", userName, filter, sortBy, page + 1],
      queryFn: () =>
        getPatientAppointments(userName, { filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["patient-appointments", userName, filter, sortBy, page - 1],
      queryFn: () =>
        getPatientAppointments(userName, { filter, sortBy, page: page - 1 }),
    });

  console.log(patientAppointments);
  return { isLoading, error, patientAppointments, count };
}
