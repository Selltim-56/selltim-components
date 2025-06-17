import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType, type EmblaPluginType } from "embla-carousel";
import "../../../style.css";
import React, { useCallback } from "react";

type BaseCarouselProps = {
  /** Elements to be rendered inside the Carousel */
  children?: React.ReactNode;

  /** Custom previous button element */
  prevButton?: React.ReactNode;

  /** Custom next button element */
  nextButton?: React.ReactNode;

  /** Show controls (prev/next buttons) */
  controls?: boolean;

  /** Number of slides to show at once */
  slidesToShow?: number;

  /** Embla carousel options see doc https://www.embla-carousel.com/api/options/#reference */
  emblaOptions?: EmblaOptionsType;

  /** Embla plugins https://www.embla-carousel.com/plugins/#choose-a-plugin */
  plugins?: EmblaPluginType[];
};

export type CarouselProps = BaseCarouselProps;

/**
 * Carousel component
 */
const Carousel = ({
  children,
  prevButton,
  nextButton,
  controls,
  slidesToShow = 1,
  emblaOptions = {},
  plugins = [],
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);

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
      className="sc:flex-shrink-0 sc:flex-grow-0"
      key={index}
    >
      {child}
    </div>
  ));

  return (
    <div className="sc:relative">
      <div className="sc:overflow-hidden" ref={emblaRef}>
        <div className="sc:flex">{slides}</div>
      </div>
      {controls && (
        <>
          <button
            onClick={prevSlide}
            className="sc:cursor-pointer sc:absolute sc:left-2 sc:top-1/2 sc:transform sc:-translate-y-1/2"
          >
            {prevButton}
          </button>
          <button
            onClick={nextSlide}
            className="sc:cursor-pointer sc:absolute sc:right-2 sc:top-1/2 sc:transform sc:-translate-y-1/2"
          >
            {nextButton}
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
