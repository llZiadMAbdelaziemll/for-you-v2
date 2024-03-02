import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditReport } from "../../services/apiReports";

export function useCreateReport() {
  const queryClient = useQueryClient();

  const { mutate: createReport, isLoading: isCreating } = useMutation({
    mutationFn: createEditReport,
    onSuccess: () => {
      toast.success("New Report successfully created");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createReport };
}
