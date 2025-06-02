import '../../../style.css';

import { ImgComparisonSlider } from "@img-comparison-slider/react";

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
      <img slot="first" src={beforeImageUrl} />
      <img slot="second" src={afterImageUrl} />
    </ImgComparisonSlider>
  )
};

export default ComparisonSlider;
