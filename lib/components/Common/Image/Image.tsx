import { useState } from "react";
import "../../../style.css";
import Lightbox, { type LightboxProps } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  /** Remaining options for lightBox */
  lightboxOptions?: LightboxProps;
};

/** Primary UI component for rendering image with a lightbox */
const Image = ({ lightboxOptions, ...props }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
          setIsOpen(true);
        }}
        {...props}
      />
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        styles={{ button: { display: "none" }, ...lightboxOptions?.styles }}
        slides={[{ src: props.src || "", alt: props.alt || "" }]}
        {...lightboxOptions}
      />
    </>
  );
};

export default Image;
