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
    <div className={`sc:flex sc:flex-col ${reverse ? 'sc:md:flex-row-reverse' : 'sc:md:flex-row'} sc:md:gap-12 ${containerClassName || ''}`}>
      <div className="sc:flex-1 sc:aspect-video">
        {mediaType === 'video' && (
          <video
            className={`sc:w-full sc:h-full sc:object-cover ${mediaClassName || ''}`}
            src={mediaUrl}
            autoPlay
            muted
            loop
            controls
          />
        )}
        {mediaType === 'image' && (
          <Image height={1024} width={500} className={`sc:h-full sc:w-full sc:object-cover ${mediaClassName || ''}`} src={mediaUrl} alt="" />
        )}
      </div>
      <div className={`sc:flex sc:flex-col sc:flex-1 sc:justify-center sc:py-6 sc:px-4 sc:md:px-0 ${contentClassName || ''}`}>
        <div
          className={`sc:flex sc:flex-col sc:gap-3 sc:prose ${reverse ? 'sc:text-right' : 'sc:text-left'}`}
          dangerouslySetInnerHTML={{
            __html: content || "",
          }}
        />
        {action && (
          <div className="sc:mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  )
};

export default Section;
