"use client";

import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import "../../../style.css";
import Link from "next/link";

export interface ContactCTAProps {
  /** Phone number to display and call */
  phone: string;

  /** Mail adress to display and send mail to */
  mail?: string;

  /** Adress to display */
  address?: string;

  /** Class name for the container */
  className?: string;

  /** Class name for the icons */
  iconClassName?: string;

  /** Class name for the text */
  textClassName?: string;

  /** Whether to show it right or left */
  direction?: "left" | "right";
}

/** Text and phone contact section with hover expand */
const ContactCTA = ({
  phone,
  mail,
  address,
  className,
  iconClassName,
  textClassName,
  direction,
}: ContactCTAProps) => {
  const isRight = direction === "right";

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-50 group px-1 md:px-2 py-4 md:py-6 flex items-center ${className} ${
        isRight ? "right-0" : "left-0 flex-row-reverse"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        {phone && <PhoneIcon className={`h-5 md:h-7 aspect-square ${iconClassName}`} />}
        {mail && <EnvelopeIcon className={`h-5 md:h-7 aspect-square ${iconClassName}`} />}
        {address && <MapPinIcon className={`h-5 md:h-7 aspect-square ${iconClassName}`} />}
      </div>
      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 group-hover:max-w-84 max-w-0`}
      >
        {phone && (
          <Link href={`tel:${phone}`}>
            <p className={`w-max hover:underline ${textClassName}`}>{phone}</p>
          </Link>
        )}
        {mail && (
          <Link href={`mailto:${mail}`}>
            <p className={`w-max hover:underline ${textClassName}`}>{mail}</p>
          </Link>
        )}
        {address && <p className={`w-max ${textClassName}`}>{address}</p>}
      </div>
    </div>
  );
};

export default ContactCTA;
