import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { RiErrorWarningFill } from "react-icons/ri";
type Props = {
  message: string;
};
export default function ErrorMessageResponse({ message }: Props) {
  return (
    <Alert variant="destructive" className="text-white">
      <AlertIcon>
        <RiErrorWarningFill />
      </AlertIcon>
      <AlertTitle className="capitalize">{message}</AlertTitle>
    </Alert>
  );
}
