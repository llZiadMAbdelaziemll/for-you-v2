import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditDoctor } from "../../services/apiDoctors";
import { toast } from "react-hot-toast";

export function useEditDoctor() {
  const queryClient = useQueryClient();

  const { mutate: editDoctor, isLoading: isEditing } = useMutation({
    mutationFn: ({ newDoctorData, id }) => createEditDoctor(newDoctorData, id),
    onSuccess: () => {
      toast.success("Doctor successfully edited");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editDoctor };
}
