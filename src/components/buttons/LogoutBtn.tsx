import { Button } from "@/components/ui/button";
import { useLogout } from "./useLogout";

export default function LogoutBtn() {
  const { HandleLogout } = useLogout();
  return (
    <Button
      className="text-sm h-8 rounded-sm"
      onClick={HandleLogout}
      variant="destructive">
      Logout
    </Button>
  );
}
