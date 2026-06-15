import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   title?: string;
   children: React.ReactNode;
   size?: "sm" | "md" | "lg";
   showCloseButton?: boolean;
   closeOnOverlayClick?: boolean;
}

export function Modal({
   isOpen,
   onClose,
   title,
   children,
   size = "md",
   showCloseButton = true,
   closeOnOverlayClick = true,
}: ModalProps) {
   const [mounted, setMounted] = useState(false);
   const [isAnimating, setIsAnimating] = useState(false);
   const modalRef = useRef<HTMLDivElement>(null);

   // Handle mounting and animation states
   useEffect(() => {
      if (isOpen) {
         setMounted(true);
         // Prevent body scroll when modal is open
         document.body.style.overflow = "hidden";
         // Trigger animation in next frame
         const timer = setTimeout(() => {
            setIsAnimating(true);
         }, 10);
         return () => clearTimeout(timer);
      } else {
         setIsAnimating(false);
         // Allow animation to finish before unmounting (duration-300 = 300ms)
         const timer = setTimeout(() => {
            setMounted(false);
            document.body.style.overflow = "";
         }, 300);
         return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
         };
      }
   }, [isOpen]);

   // Close on escape key
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape" && isOpen) {
            onClose();
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [isOpen, onClose]);

   if (!mounted) return null;

   const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
   };

   const modalContent = (
      <div
         className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            isAnimating ? "visible" : "invisible"
         }`}
         role="dialog"
         aria-modal="true"
      >
         {/* Backdrop Overlay with Glassmorphism */}
         <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
               isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => closeOnOverlayClick && onClose()}
         />

         {/* Modal Card container */}
         <div
            ref={modalRef}
            className={`relative w-full ${
               sizeClasses[size]
            } transform rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all duration-300 ease-out ${
               isAnimating
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-95 opacity-0"
            }`}
         >
            {/* Header */}
            {title || showCloseButton ? (
               <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                  {title && (
                     <h2 className="text-lg font-bold text-foreground tracking-wide">
                        {title}
                     </h2>
                  )}
                  {showCloseButton && (
                     <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary-button hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Fechar"
                     >
                        <X size={18} />
                     </button>
                  )}
               </div>
            ) : null}

            {/* Content */}
            <div className="text-foreground">{children}</div>
         </div>
      </div>
   );

   return createPortal(modalContent, document.body);
}
