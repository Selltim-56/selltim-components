import "../../../style.css";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll, {
  type AutoScrollOptionsType,
} from "embla-carousel-auto-scroll";
import { type EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import Link from "next/link";

export type PartnersProps = EmblaOptionsType & {
  /** List of partner logos src and optional href*/
  partners: { src: string; href?: string }[];

  /** Class that will be applied to each partner element */
  className?: string;

  /** Options for auto-scrolling see docs at https://www.embla-carousel.com/plugins/auto-scroll/ */
  autoScrollOptions?: AutoScrollOptionsType;
};

/**
 * Partners carousel component
 */
const Partners = ({
  partners,
  autoScrollOptions,
  className,
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
        speed: 0.5,
        ...autoScrollOptions,
      }),
    ]
  );

  const slides = partners.map((logo, index) => (
    <div className={`sc:flex-shrink-0 ${partners.length < 4 ? 'sc:w-80' : 'sc:w-1/2 sc:md:w-1/3 sc:lg:w-1/4'} sc:h-30 sc:p-2 ${className}`} key={index}>
      {logo.href ? (
        <Link href={logo.href} target="_blank" rel="noopener noreferrer">
          <Image
            src={logo.src}
            width={500}
            height={250}
            alt={`Partner logo ${index + 1}`}
            className="sc:w-full sc:h-full sc:object-contain"
          />
        </Link>
      ) : (
        <Image
          src={logo.src}
          width={500}
          height={250}
          alt={`Partner logo ${index + 1}`}
          className="sc:w-full sc:h-full sc:object-contain"
        />
      )}
    </div>
  ));

  return (
    <div className="sc:relative">
      <div className="sc:overflow-hidden" ref={emblaRef}>
        <div className={`sc:flex ${slides.length < 4 && "sc:md:justify-center"}`}>{slides}</div>
      </div>
    </div>
  );
};

export default Partners;
