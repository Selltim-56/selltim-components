import "../../../style.css";
import "yet-another-react-lightbox/styles.css";
import HTMLFlipBook from "react-pageflip";
import { Document, Page as PdfPage } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import React, { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export type PDFBookProps = {
  /**
   * URL to the pdf file
   */
  src: string;

  /**
   * Height of the book
   */
  height: number;

  /**
   * Width of the book
   */
  width: number;

  /**
   * Additional CSS classes
   */
  className?: string;
};

/** Primary UI component for rendering a pdf file like a book */
const PDFBook = ({ src, width, height, className, ...props }: PDFBookProps) => {
  const [pagesCount, setPagesCount] = useState(0);

  return (
    <Document className={className} loading={() => <div></div>} file={src} onLoadSuccess={({ numPages }) => setPagesCount(numPages)}>
      <HTMLFlipBook
        width={width}
        height={height}
        className={""}
        style={{}}
        startPage={0}
        size={"fixed"}
        minWidth={0}
        maxWidth={0}
        minHeight={0}
        maxHeight={0}
        drawShadow
        flippingTime={500}
        usePortrait={false}
        startZIndex={0}
        autoSize
        maxShadowOpacity={0.7}
        showCover={false}
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick={false}
        {...props}
      >
        {new Array(pagesCount).fill(0).map((_, index) => (
          <Page key={index} number={index + 1} height={height} width={width} />
        ))}
      </HTMLFlipBook>
    </Document>
  );
};

export default PDFBook;

const Page = React.forwardRef<HTMLDivElement, { number: number, width: number, height: number }>(({ number, height, width }, ref) => {
  return (
    <div ref={ref}>
      <div className="absolute inset-0 flex flex-1 items-center justify-center overflow-hidden">
        <PdfPage height={height} width={width}  renderTextLayer={false} pageNumber={number} />
      </div>
    </div>
  );
});
