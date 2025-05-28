import "../../../style.css";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll, {
  type AutoScrollOptionsType,
} from "embla-carousel-auto-scroll";
import { type EmblaOptionsType } from "embla-carousel";

export type PartnersProps = EmblaOptionsType & {
  /** List of partner logos src and href*/
  partnerLogos: { src: string; href: string }[];

  /** How many partners to show */
  partnersToShow: number;

  /** Options for auto-scrolling see docs at https://www.embla-carousel.com/plugins/auto-scroll/ */
  autoScrollOptions?: AutoScrollOptionsType;
};

const Partners = ({
  partnerLogos,
  partnersToShow = 3,
  autoScrollOptions,
  ...props
}: PartnersProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      ...props,
    },
    [
      AutoScroll({
        startDelay: 0,
        stopOnInteraction: false,
        speed: 1.3,
        ...autoScrollOptions,
      }),
    ]
  );

  const slides = partnerLogos.map((logo, index) => (
    <div
      className="flex-shrink-0 sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
      style={{ width: `${100 / partnersToShow}%` }}
      key={index}
    >
      <a href={logo.href} target="_blank" rel="noopener noreferrer">
        <img
          src={logo.src}
          alt={`Partner logo ${index + 1}`}
          className="w-full h-full object-contain"
        />
      </a>
    </div>
  ));

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`flex ${partnerLogos.length % partnersToShow > 1 ? 'justify-center' : ''}`}>{slides}</div>
      </div>
    </div>
  );
};

export default Partners;
