import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteAppointment as deleteAppointmentApi } from "../../services/apiAppointments";
import { useUser } from "../authentication/useUser";

export function useDeleteAppointment() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;

  const { isLoading: isDeleting, mutate: deleteAppointment } = useMutation({
    mutationFn: deleteAppointmentApi,
    onSuccess: () => {
      toast.success("Appointment successfully deleted");
      // {
      //   queryKey: ["appointments"],
      // }
      queryClient.invalidateQueries(
        userRole === "patient"
          ? {
              queryKey: ["patient-appointments"],
            }
          : userRole === "doctor"
          ? {
              queryKey: ["doctor-appointments"],
            }
          : {
              queryKey: ["appointments"],
            }
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAppointment };
}
