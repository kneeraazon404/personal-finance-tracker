"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ConfirmDeleteButtonProps {
  onDelete: () => Promise<unknown>;
  confirmText?: string;
  successMessage?: string;

  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ConfirmDeleteButton({
  onDelete,
  confirmText = "Are you sure you want to delete this item?",
  successMessage = "Deleted successfully.",

  variant = "destructive",
  size = "sm",
  className,
  disabled,
  children,
}: ConfirmDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (isPending) return;
    const confirmed = window.confirm(confirmText);
    if (!confirmed) return;

    startTransition(async () => {
      try {
        await onDelete();
        toast.success(successMessage);
      } catch {
        toast.error("Something went wrong");
      } finally {
      }
    });
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleDelete}
      disabled={disabled || isPending}
    >
      {isPending ? "Deleting..." : (children ?? "Delete")}
    </Button>
  );
}
