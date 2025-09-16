import { Button } from "@/components/ui/button";
import { useLogout } from "./useLogout";

export default function LogoutBtn() {
  const { HandleLogout } = useLogout();
  return (
    <Button onClick={HandleLogout} variant="destructive">
      Logout
    </Button>
  );
}
