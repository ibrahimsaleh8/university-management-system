import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

type Props = {
  icon: "error" | "info" | "question" | "success" | "warning";
  title: string;
};

export default function GlobalToast({ title, icon }: Props) {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showCloseButton: true,
    background: "#1e1e1e",
    color: "#fff",
    customClass: {
      popup: "dark-toast",
      timerProgressBar: "white-progress-bar",
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title,
  });
}
