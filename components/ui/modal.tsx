"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Modal({ open, onOpenChange, title, subtitle, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
            "transition-opacity duration-200 ease-out",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
          )}
        />
        <Dialog.Viewport className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Dialog.Popup
              className={cn(
                "relative w-full max-w-4xl bg-white rounded-2xl",
                "border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
                "flex flex-col max-h-[90vh]",
                "transition-all duration-200 ease-out",
                "data-[starting-style]:opacity-0 data-[starting-style]:translate-y-2",
                "data-[ending-style]:opacity-0 data-[ending-style]:translate-y-2"
              )}
            >
              {/* Fixed header */}
              <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
                <div>
                  <Dialog.Title className="text-sm font-semibold text-gray-900 tracking-tight leading-none">
                    {title}
                  </Dialog.Title>
                  {subtitle && (
                    <Dialog.Description className="text-[11px] text-gray-400 mt-1 leading-none">
                      {subtitle}
                    </Dialog.Description>
                  )}
                </div>
                <Dialog.Close
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0 -mt-0.5"
                  aria-label="Close"
                >
                  <X size={15} />
                </Dialog.Close>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-6 py-5">
                {children}
              </div>
            </Dialog.Popup>
          </div>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
