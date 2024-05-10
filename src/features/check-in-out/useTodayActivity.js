import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "../../services/apiAppointments";
import { useUser } from "../authentication/useUser";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}
