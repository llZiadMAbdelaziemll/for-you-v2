import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePatient as deletePatientApi } from "../../services/apiPatients";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePatient } = useMutation({
    mutationFn: deletePatientApi,
    onSuccess: () => {
      toast.success("Patient successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePatient };
}
