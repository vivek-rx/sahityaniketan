"use client";

import React from "react";
import HoldButton, { HoldButtonProps } from "@/components/ui/HoldButton";
import { Trash2 } from "lucide-react";

export interface AdminHoldDeleteButtonProps extends Omit<HoldButtonProps, "onHold"> {
  onHold: () => void;
  label?: string;
  doneLabel?: string;
}

export function AdminHoldDeleteButton({
  onHold,
  label = "Hold to delete",
  doneLabel = "Deleted",
  size = "sm",
  radius = 8,
  holdTime = 1200,
  className = "",
  ...props
}: AdminHoldDeleteButtonProps) {
  return (
    <HoldButton
      size={size}
      radius={radius}
      holdTime={holdTime}
      backgroundColor="#fee2e2"
      fillColor="#dc2626"
      textColor="#991b1b"
      fillTextColor="#ffffff"
      doneLabel={doneLabel}
      icon={<Trash2 className="h-3.5 w-3.5" />}
      doneIcon={<Trash2 className="h-3.5 w-3.5" />}
      onHold={onHold}
      className={`text-xs font-bold transition-all shadow-xs ${className}`}
      {...props}
    >
      {label}
    </HoldButton>
  );
}

export default AdminHoldDeleteButton;
