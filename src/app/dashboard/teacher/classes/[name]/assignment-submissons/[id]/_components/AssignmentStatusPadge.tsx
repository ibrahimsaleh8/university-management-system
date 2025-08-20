import { AssignmentSubmissionStatus } from "@/lib/globalTypes";
import React from "react";

export default function AssignmentStatusPadge({
  status,
}: {
  status: AssignmentSubmissionStatus;
}) {
  const statusClassName =
    status == "GRADED"
      ? "bg-glass-green text-main-text"
      : "bg-glass-blue text-blue-400";
  return (
    <p
      className={`capitalize text-xs w-fit rounded-sm px-3 font-medium py-1.5 bg-gla ${statusClassName}`}>
      {status.toLowerCase()}
    </p>
  );
}
