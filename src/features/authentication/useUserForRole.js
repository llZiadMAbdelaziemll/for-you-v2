import { useQuery } from "@tanstack/react-query";
import { userForRole } from "../../services/apiAuth";

export function useUserForRole() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["users"],
    queryFn: userForRole,
  });

  return { isLoading, user };
}
