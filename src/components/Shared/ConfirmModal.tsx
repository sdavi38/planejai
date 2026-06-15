import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle, Trash2, HelpCircle } from "lucide-react";

interface ConfirmModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   description: React.ReactNode;
   confirmText?: string;
   cancelText?: string;
   variant?: "danger" | "warning" | "info";
   isLoading?: boolean;
}

export function ConfirmModal({
   isOpen,
   onClose,
   onConfirm,
   title,
   description,
   confirmText = "Confirmar",
   cancelText = "Cancelar",
   variant = "danger",
   isLoading = false,
}: ConfirmModalProps) {
   // Determine icon and colors based on variant
   const getVariantConfig = () => {
      switch (variant) {
         case "danger":
            return {
               icon: Trash2,
               iconBg: "bg-red-500/10 dark:bg-red-500/20 text-red-500",
               confirmBtnClass: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all rounded-xl",
            };
         case "warning":
            return {
               icon: AlertTriangle,
               iconBg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-500",
               confirmBtnClass: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all rounded-xl",
            };
         case "info":
         default:
            return {
               icon: HelpCircle,
               iconBg: "bg-primary/10 dark:bg-primary/20 text-primary",
               confirmBtnClass: "bg-primary hover:opacity-90 active:opacity-100 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl",
            };
      }
   };

   const config = getVariantConfig();
   const IconComponent = config.icon;

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         showCloseButton={true}
         size="sm"
         closeOnOverlayClick={!isLoading}
      >
         <div className="flex flex-col items-center text-center p-2">
            {/* Header Icon Indicator */}
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full ${config.iconBg} animate-bounce-subtle`}>
               <IconComponent size={28} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
               {title}
            </h3>

            {/* Description / Content */}
            <div className="text-sm text-muted-foreground leading-relaxed mb-6 px-1">
               {description}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full mt-2">
               <Button
                  variant="secondary"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 py-3 justify-center text-xs sm:text-sm font-semibold rounded-xl border border-border bg-secondary-button text-foreground hover:bg-border/30 transition-colors"
               >
                  {cancelText}
               </Button>
               <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 flex items-center justify-center text-xs sm:text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${config.confirmBtnClass}`}
               >
                  {isLoading ? (
                     <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                     confirmText
                  )}
               </button>
            </div>
         </div>
      </Modal>
   );
}
