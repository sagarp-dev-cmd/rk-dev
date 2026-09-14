
import { cn } from "@/lib/utils";
import { JobStatus } from "@/types/job";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig = {
  applied: {
    label: "Applied",
    className: "status-badge-applied",
  },
  interview: {
    label: "Interview",
    className: "status-badge-interview",
  },
  rejected: {
    label: "Rejected",
    className: "status-badge-rejected",
  },
  offer: {
    label: "Offer",
    className: "status-badge-offer",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
