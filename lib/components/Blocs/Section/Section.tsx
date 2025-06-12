import '../../../style.css';

import type { ReactElement } from "react";
import Image from "next/image";

export interface SectionProps {
  /** URL to the media file */
  mediaUrl: string;
  /** Type of the media */
  mediaType: 'image' | 'video';
  /** Should the layout be reversed? */
  reverse: boolean;
  /** Section content */
  content: string;
  /** React element to render as action */
  action?: ReactElement;

  // Style
  /** Add container CSS classes */
  containerClassName?: string;
  /** Add media CSS classes */
  mediaClassName?: string;
  /** Add content CSS classes */
  contentClassName?: string;
}

/** Text and image section */
const Section = ({
  mediaUrl,
  mediaType = 'image',
  reverse = false,
  content,
  action,
  containerClassName,
  mediaClassName,
  contentClassName
}: SectionProps) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:gap-12 ${containerClassName || ''}`}>
      <div className="flex-1 aspect-video">
        {mediaType === 'video' && (
          <video
            className={`w-full h-full object-cover ${mediaClassName || ''}`}
            src={mediaUrl}
            autoPlay
            muted
            loop
            controls
          />
        )}
        {mediaType === 'image' && (
          <Image height={1024} width={500} className={`h-full w-full object-cover ${mediaClassName || ''}`} src={mediaUrl} alt="" />
        )}
      </div>
      <div className={`flex flex-col flex-1 justify-center py-6 px-4 md:px-0 ${contentClassName || ''}`}>
        <div
          className={`flex flex-col gap-3 prose ${reverse ? 'text-right' : 'text-left'}`}
          dangerouslySetInnerHTML={{
            __html: content || "",
          }}
        />
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  )
};

export default Section;
