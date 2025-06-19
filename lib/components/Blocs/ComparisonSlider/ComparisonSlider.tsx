import '../../../style.css';

import { ImgComparisonSlider } from "@img-comparison-slider/react";
import Image from "next/image";
import type { ReactElement } from "react";

export type ComparisonSliderProps = {
  /** URL to the before image */
  beforeImageUrl: string;
  /** URL to the after image */
  afterImageUrl: string;

  /** Custom slider handle */
  handle?: ReactElement;

  // Style
  /** Add container CSS classes */
  className?: string;
}

/**
 * Text and image section
 *
 * You can customize the comparison:
 * ```css
 * img-comparison-slider {
 *     --divider-width: 2px;
 *     --divider-color: #c0c0c0;
 *     --default-handle-opacity: 0.3;
 * }
 * ```
 *
 * More on https://github.com/sneas/img-comparison-slider
 */
const ComparisonSlider = ({ beforeImageUrl, afterImageUrl, className, handle }: ComparisonSliderProps) => {
  return (
    <ImgComparisonSlider className={className}>
      <div slot="first" className={`relative ${className}`}>
        <Image fill className="object-cover" slot="first" src={beforeImageUrl} alt="" />
      </div>
      <div slot="second" className={`relative ${className}`}>
        <Image fill className="object-cover" slot="second" src={afterImageUrl} alt="" />
      </div>
      {handle && (
        <div slot="handle">
          {handle}
        </div>
      )}
    </ImgComparisonSlider>
  )
};

export default ComparisonSlider;
