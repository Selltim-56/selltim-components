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
      <Image width={1024} height={500} slot="first" src={beforeImageUrl} alt="" />
      <Image width={1024} height={500} slot="second" src={afterImageUrl} alt="" />
    </ImgComparisonSlider>
  )
};

export default ComparisonSlider;
