import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDoctor as deleteDoctorApi } from "../../services/apiDoctors";

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteDoctor } = useMutation({
    mutationFn: deleteDoctorApi,
    onSuccess: () => {
      toast.success("Doctor successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteDoctor };
}
