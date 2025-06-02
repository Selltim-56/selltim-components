import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "../../../style.css";

export interface PopupProps {
  /** Additional CSS classes */
  className?: string;

  /** Date at witch popup should not open anymore */
  endOpeningDate?: Date;

  /** Children that will be rendered inside the popup */
  children?: React.ReactNode;
}

/** Popup that display if the end opening date is not passed */
const Popup = ({
  className,
  endOpeningDate,
  children,
}: PopupProps) => {
  const shouldRender = !endOpeningDate || endOpeningDate > new Date();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }
  }, [shouldRender]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    shouldRender && (
      <div
        onClick={handleClose}
        className={`fixed inset-0 flex items-center justify-center z-50 w-screen h-screen bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative bg-white w-8/10 h-8/10 ${className} transition-all duration-300 ease-out ${
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
    )
  );
};

export default Popup;
