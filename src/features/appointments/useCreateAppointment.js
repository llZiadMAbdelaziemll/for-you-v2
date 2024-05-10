import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createAppointment } from "../../services/apiAppointments";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  const { mutate: createAppointmentFn, isLoading: isCreating } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success("New appointment successfully created");

      queryClient.invalidateQueries({
        queryKey: ["patient-appointments"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAppointmentFn };
}
