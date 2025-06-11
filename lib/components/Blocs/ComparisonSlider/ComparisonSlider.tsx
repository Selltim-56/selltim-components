import '../../../style.css';

import { ImgComparisonSlider } from "@img-comparison-slider/react";
import Image from "next/image";

export type ComparisonSliderProps = {
  /** URL to the before image */
  beforeImageUrl: string;
  /** URL to the after image */
  afterImageUrl: string;

  // Style
  /** Add container CSS classes */
  className?: string;
}

/** Text and image section */
const ComparisonSlider = ({ beforeImageUrl, afterImageUrl, className }: ComparisonSliderProps) => {
  return (
    <ImgComparisonSlider className={className}>
      <div slot="first" className={`w-full relative ${className}`}>
        <Image fill className="object-cover" slot="first" src={beforeImageUrl} alt="" />
      </div>
      <div slot="second" className={`w-full relative ${className}`}>
        <Image fill className="object-cover" slot="second" src={afterImageUrl} alt="" />
      </div>
    </ImgComparisonSlider>
  )
};

export default ComparisonSlider;
