import { useEffect, useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "../../../style.css";
import hash from "object-hash";

export type PopupProps = {
  endDate?: Date;
  children?: React.ReactNode;
  maxViewsPerSession?: number;
};

const Popup = ({ endDate, children, maxViewsPerSession }: PopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // to prevent flicker on SSR

  const autoIdentifier = useMemo(() => {
    return `popup-${hash({ content: children })}-views`;
  }, [children]);

  useEffect(() => {
    const now = new Date();
    const isDateValid = !endDate || endDate > now;
    let views = 0;

    try {
      views = autoIdentifier
          ? parseInt(sessionStorage.getItem(autoIdentifier) ?? '0')
          : 0;
    } catch { /* empty */ }

    if (isDateValid && maxViewsPerSession && views < maxViewsPerSession) {
      requestAnimationFrame(() => {
        setIsOpen(true);
        try {
          if (autoIdentifier) {
            sessionStorage.setItem(autoIdentifier, String(parseInt(sessionStorage.getItem(autoIdentifier) ?? '0') + 1));
          }
        } catch { /* empty */ }
      });
    }

    setHasMounted(true); // used to avoid SSR mismatch
  }, [endDate, autoIdentifier, maxViewsPerSession]);

  const handleClose = () => setIsOpen(false);

  if (!hasMounted) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        <button
          onClick={handleClose}
          className="cursor-pointer absolute top-2 right-2 w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <XMarkIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
