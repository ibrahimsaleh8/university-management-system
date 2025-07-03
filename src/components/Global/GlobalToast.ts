import { toast } from "sonner";

type Props = {
  icon: "error" | "info" | "success" | "warning";
  title: string;
};

export default function GlobalToast({ title, icon }: Props) {
  if (icon == "success") {
    toast.success(title, {
      closeButton: true,
      style: {
        background: "#046e2b",
        color: "#fff",
      },
    });
  } else if (icon == "error") {
    toast.error(title, {
      closeButton: true,
      style: {
        background: "#dc2626",
        color: "#fff",
      },
    });
  } else if (icon == "info") {
    toast.info(title, {
      closeButton: true,
      style: {
        background: "#032c86",
        color: "#fff",
      },
    });
  } else if (icon == "warning") {
    toast.warning(title, {
      closeButton: true,
      style: {
        background: "#b47d1e",
        color: "#fff",
      },
    });
  }
}
