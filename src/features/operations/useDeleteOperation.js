import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteOperation as deleteOperationApi } from "../../services/apiOperations";

export function useDeleteOperation() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteOperation } = useMutation({
    mutationFn: deleteOperationApi,
    onSuccess: () => {
      toast.success("Operation successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["operations"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteOperation };
}
