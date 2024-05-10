import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "../../services/apiDoctors";

export function useAllDoctors() {
  const {
    isLoading,
    data: { data: doctors } = {},
    error,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  console.log(doctors);
  return { isLoading, error, doctors };
}
