import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ appointmentId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(appointmentId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
