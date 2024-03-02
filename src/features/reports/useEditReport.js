import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditReport } from "../../services/apiReports";

export function useEditReport() {
  const queryClient = useQueryClient();

  const { mutate: editReport, isLoading: isEditing } = useMutation({
    mutationFn: ({ obj, id }) => createEditReport(obj, id),
    onSuccess: () => {
      toast.success("Report successfully edited");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editReport };
}
