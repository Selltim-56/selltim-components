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
    <div className={`flex-shrink-0 ${partners.length < 4 ? 'w-80' : ' w-1/2 md:w-1/3 lg:w-1/4'} h-30 p-2 ${className}`} key={index}>
      {logo.href ? (
        <Link href={logo.href} target="_blank" rel="noopener noreferrer">
          <Image
            src={logo.src}
            width={500}
            height={250}
            alt={`Partner logo ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </Link>
      ) : (
        <Image
          src={logo.src}
          width={500}
          height={250}
          alt={`Partner logo ${index + 1}`}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  ));

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`flex ${slides.length < 4 && "md:justify-center"}`}>{slides}</div>
      </div>
    </div>
  );
};

export default Partners;
