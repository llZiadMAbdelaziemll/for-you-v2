import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditAppointment } from "../../services/apiAppointments";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  const { mutate: createAppointment, isLoading: isCreating } = useMutation({
    mutationFn: createEditAppointment,
    onSuccess: () => {
      toast.success("New appointment successfully created");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAppointment };
}
