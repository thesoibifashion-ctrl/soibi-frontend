"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
}

const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className = "",
  showHeader = true,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[85vh] overflow-y-auto ${className}`}>
        {showHeader && (title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle>{title}</DialogTitle>
            )}

            {description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
