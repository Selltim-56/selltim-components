import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType, type EmblaPluginType } from "embla-carousel";
import "../../../style.css";
import React, { useCallback } from "react";

type BaseCarrouselProps = {
  /** Elements to be rendered inside the Carrousel */
  children?: React.ReactNode;

  /** Whether to show navigation controls */
  controls?: boolean;

  /** Number of slides to show at once */
  slidesToShow?: number;
};

type WithControls = {
  controls: true;

  /** Custom previous button element */
  prevButton: React.ReactNode;

  /** Custom next button element */
  nextButton: React.ReactNode;
};

type WithoutControls = {
  controls?: false;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
};

export type CarrouselProps = EmblaOptionsType &
  EmblaPluginType[] &
  BaseCarrouselProps &
  (WithControls | WithoutControls);

const Carrousel = ({
  children,
  prevButton,
  nextButton,
  controls,
  slidesToShow = 1,
  ...props
}: CarrouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(props);

  const prevSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const nextSlide = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const slides = React.Children.map(children, (child, index) => (
    <div
      style={{ width: `${100 / slidesToShow}%` }}
      className=" flex-shrink-0 flex-grow-0"
      key={index}
    >
      {child}
    </div>
  ));

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{slides}</div>
      </div>
      {controls && (
        <>
          <button
            onClick={prevSlide}
            className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            {prevButton}
          </button>
          <button
            onClick={nextSlide}
            className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {nextButton}
          </button>
        </>
      )}
    </div>
  );
};

export default Carrousel;
