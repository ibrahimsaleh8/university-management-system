import { toast } from "sonner";

type Props = {
  icon: "error" | "info" | "success" | "warning";
  title: string;
};

export default function GlobalToast({ title, icon }: Props) {
  if (icon == "success") {
    toast(`✅ ${title}`, {
      closeButton: true,
      style: {
        background: "#1a1919",
        color: "#41ed00",
        borderColor: "#232323",
        fontWeight: "bold",
      },
    });
  } else if (icon == "error") {
    toast(`❌ ${title}`, {
      closeButton: true,
      style: {
        background: "#1a1919",
        color: "#f80000",
        borderColor: "#232323",
      },
    });
  } else if (icon == "info") {
    toast(`ℹ️ ${title}`, {
      closeButton: true,
      style: {
        background: "#1a1919",
        color: "#3b76f6",
        borderColor: "#232323",
        fontWeight: "bold",
      },
    });
  } else if (icon == "warning") {
    toast(`⚠️ ${title}`, {
      closeButton: true,
      style: {
        background: "#1a1919",
        color: "#e69200",
        borderColor: "#232323",
        fontWeight: "bold",
      },
    });
  }
}
