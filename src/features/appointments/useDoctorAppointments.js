import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDoctorAppointments } from "../../services/apiAppointments";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useDoctorAppointments(userName) {
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
    data: { data: doctorAppointments, count } = {},
    error,
  } = useQuery({
    queryKey: ["doctor-appointments", userName, filter, sortBy, page],
    queryFn: () => getDoctorAppointments(userName, { filter, sortBy, page }),
    retry: false,
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["doctor-appointments", userName, filter, sortBy, page + 1],
      queryFn: () =>
        getDoctorAppointments(userName, { filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["doctor-appointments", userName, filter, sortBy, page - 1],
      queryFn: () =>
        getDoctorAppointments(userName, { filter, sortBy, page: page - 1 }),
    });
  return { isLoading, error, doctorAppointments, count };
}
