import { useState } from "react";
import "../../../style.css";
import BaseImage, { type ImageProps as BaseImageProps } from 'next/image';
import Lightbox, { type LightboxProps } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type ImageProps = BaseImageProps & {
  /** Remaining options for lightBox */
  lightboxOptions?: LightboxProps;
};

/** Primary UI component for rendering image with a lightbox */
const Image = ({ lightboxOptions, ...props }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseImage
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
          setIsOpen(true);
        }}
        {...props}
      />
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        styles={{ ...lightboxOptions?.styles }}
        slides={[{ src: props.src as string || "", alt: props.alt || "" }, ...(lightboxOptions?.slides ?? [])]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          ...lightboxOptions?.render
        }}
        {...lightboxOptions}
      />
    </>
  );
};

export default Image;
