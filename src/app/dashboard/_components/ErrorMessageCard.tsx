import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { RiAlertFill } from "react-icons/ri";

export default function ErrorMessageCard({
  errorDescription,
}: {
  errorDescription: string;
}) {
  return (
    <Alert variant="destructive" appearance="light" close={false}>
      <AlertIcon>
        <RiAlertFill />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p className="font-medium capitalize">{errorDescription} </p>
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
}
