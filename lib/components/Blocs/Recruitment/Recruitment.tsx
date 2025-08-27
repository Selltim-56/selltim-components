import "../../../style.css";

import dayjs from "dayjs";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export interface RecruitmentProps {
  /** URL to the media file */
  mediaUrl: string;

  /** Should the layout be reversed? */
  reverse: boolean;

  /** Recruitment title */
  title: string;

  /** Recruitment city */
  city: string;

  /** Recruitment infos */
  content: string;

  /** Recruitment date */
  date?: Date | string;

  /** Recruitment ended */
  ongoingRecruitment?: boolean;

  /** Recruitment link */
  link?: string;

  /** Custom texts for the recruitment CTA*/
  customCTATexts?: {
    /** Custom text for the recruitment ended message */
    ended?: string;
    /** Custom text for the recruitment ongoing message */
    ongoing?: string;
    /** Custom text for the view offer link */
    viewOffer?: string;
  };

  // Style
  /** Add container CSS classes */
  containerClassName?: string;
  /** Add media CSS classes */
  mediaClassName?: string;
  /** Add content container CSS classes */
  contentContainerClassName?: string;
  /** Add content CSS classes */
  contentClassName?: string;
  /** Add city CSS classes */
  cityClassName?: string;
  /** Add date CSS classes */
  dateClassName?: string;
  /** Add recruitment CTA container classes */
  recruitmentCTAClassName?: string;
  /** Add view offer CSS classes */
  viewOfferClassName?: string;
  /** Add recruitment info CSS classes you can have different class for ended and ongoing using an object*/
  recruitmentInfoClassName?: (ongoing: boolean) => string;
}

/** Text and image Recruitment */
const Recruitment = ({
  mediaUrl,
  reverse = false,
  title,
  city,
  date,
  content,
  containerClassName,
  mediaClassName,
  contentContainerClassName,
  cityClassName,
  dateClassName,
  contentClassName,
  recruitmentCTAClassName,
  viewOfferClassName,
  recruitmentInfoClassName,
  ongoingRecruitment = true,
  link,
  customCTATexts = {
    ended: "Recrutement terminé",
    ongoing: "Recrutement en cours",
    viewOffer: "Voir l'offre",
  },
}: RecruitmentProps) => {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } md:gap-12 ${containerClassName || ""}`}
    >
      <div className="flex-1 aspect-video">
        {mediaUrl && (
          <Image
            height={1024}
            width={500}
            className={`h-full w-full object-cover ${mediaClassName || ""}`}
            src={mediaUrl}
            alt=""
          />
        )}
      </div>
      <div
        className={`flex flex-col flex-1 py-6 px-4 md:px-0 ${
          reverse ? "text-right" : ""
        } ${contentContainerClassName || ""}`}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        {city && (
          <p
            className={`text-sm flex ${reverse ? "flex-row-reverse" : ""} ${
              cityClassName || ""
            }`}
          >
            <MapPinIcon className="w-4" />
            {city}
          </p>
        )}
        {date && (
          <p className={`text-sm ${dateClassName || ""}`}>
            Publié le {dayjs(date).format("DD/MM/YYYY")}
          </p>
        )}
        <div
          className={`flex flex-col gap-3 prose ${
            reverse ? "text-right" : "text-left"
          }  ${contentClassName || ""}`}
          dangerouslySetInnerHTML={{
            __html: content || "",
          }}
        />
      </div>
      <div className="py-6">
        <div
          className={`grid gap-4 justify-start ${
            recruitmentCTAClassName || ""
          }`}
        >
          <div
            className={`${
              recruitmentInfoClassName?.(ongoingRecruitment) || ""
            }`}
          >
            {ongoingRecruitment
              ? customCTATexts?.ongoing
              : customCTATexts?.ended}
          </div>
          <Link href={link ?? "#"} className={`${viewOfferClassName || ""}`}>
            {customCTATexts?.viewOffer}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
