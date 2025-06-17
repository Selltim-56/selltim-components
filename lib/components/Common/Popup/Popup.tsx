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

    if (isDateValid && (maxViewsPerSession ? views < maxViewsPerSession : true)) {
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
      className={`sc:fixed sc:inset-0 sc:flex sc:items-center sc:justify-center sc:z-50 sc:bg-black/50 sc:transition-opacity sc:duration-300 sc:ease-in-out ${
        isOpen ? "sc:opacity-100 sc:pointer-events-auto" : "sc:opacity-0 sc:pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`sc:relative sc:transition-all sc:duration-300 sc:ease-out ${
          isOpen
            ? "sc:opacity-100 sc:scale-100 sc:translate-y-0"
            : "sc:opacity-0 sc:scale-95 sc:translate-y-8"
        }`}
      >
        <button
          onClick={handleClose}
          className="sc:cursor-pointer sc:absolute sc:top-2 sc:right-2 sc:w-8 sc:h-8 sc:text-gray-500 sc:hover:text-gray-700 sc:transition-colors sc:duration-200"
        >
          <XMarkIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
