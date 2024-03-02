import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../../services/apiAppointments";
import { toast } from "react-hot-toast";

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  const { mutate: editAppointment, isLoading: isEditing } = useMutation({
    mutationFn: ({ newAppointmentData, id }) =>
      updateAppointment(id, newAppointmentData),
    onSuccess: () => {
      toast.success("Appointment successfully edited");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAppointment };
}
