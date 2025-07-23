import { toast } from "sonner";

type Props = {
  icon: "error" | "info" | "success" | "warning";
  title: string;
};

const toastStyles = {
  base: {
    background: "#1a1919",
    borderColor: "#232323",
    fontWeight: "bold",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  variants: {
    success: { color: "#ffff", emoji: "✅" },
    error: { color: "#ffff", emoji: "❌" },
    info: { color: "#ffff", emoji: "ℹ️" },
    warning: { color: "#ffff", emoji: "⚠️" },
  },
};

export default function GlobalToast({ title, icon }: Props) {
  const variant = toastStyles.variants[icon];

  toast(`${variant.emoji} ${title}`, {
    style: {
      ...toastStyles.base,
      color: variant.color,
      textTransform: "capitalize",
      fontSize: "13px",
    },
    cancel: true,
  });
}
