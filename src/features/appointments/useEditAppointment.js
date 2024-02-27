import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditAppointment } from "../../services/apiAppointments";
import { toast } from "react-hot-toast";

export function useEditAppointment() {
  const queryClient = useQueryClient();

  const { mutate: editAppointment, isLoading: isEditing } = useMutation({
    mutationFn: ({ newAppointmentData, id }) =>
      createEditAppointment(newAppointmentData, id),
    onSuccess: () => {
      toast.success("Appointment successfully edited");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAppointment };
}
