'use client';

import '../../../style.css';
import {type ReactElement, useEffect, useState} from "react";
import { AnimatePresence, motion } from 'motion/react';
import chromajs from 'chroma-js';

export interface HistoryProps {
  /**
   * Primary background color
   */
  backgroundColor: string;
  /**
   * Primary text color
   */
  textColor: string;
  /**
   * Items per year with their content
   */
  items: Array<{
    year: string;
    content: ReactElement;
  }>;
  /**
   * Should the years move automatically? If yes, enter timeout in ms
   */
  autoScroll?: number
}

/** Text and image section */
const Timeline = ({ items, backgroundColor, textColor, autoScroll }: HistoryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % items.length);
      }, autoScroll);

      return () => clearInterval(interval);
    }
  }, [autoScroll, items.length]);

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="relative before:absolute before:z-10 before:pointer-events-none before:left-0 before:top-0 before:bottom-0 before:w-6 before:bg-linear-to-r/oklch before:from-white before:to-transparent after:absolute after:z-10 after:pointer-events-none after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-linear-to-r/oklch after:from-transparent after:to-white">
        <div className="flex px-4 overflow-x-auto scrollbar-none">
          {items.map((item, index) => {
            const isFirstItem = index === 0;

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1, duration: 1 + (index * 0.2), ease: 'easeInOut' }}
                className={`flex ${!isFirstItem ? 'flex-1' : ''} items-center origin-center`}
              >
                {!isFirstItem && (
                  <div style={{ backgroundColor: chromajs(backgroundColor).alpha(0.2).hex() }} className="flex-1 min-w-12 h-0.5 rounded-full relative overflow-hidden">
                    <div style={{ backgroundColor: chromajs(backgroundColor).hex() }} className={`absolute top-0 bottom-0 left-0 duration-750 ${activeIndex >= index ? 'w-full' : 'w-0'}`}></div>
                  </div>
                )}
                <button onClick={() => setActiveIndex(index)} className="flex flex-col items-center">
                  <div style={{ color: textColor, backgroundColor: activeIndex >= index ? chromajs(backgroundColor).hex() : chromajs(backgroundColor).alpha(0.2).hex() }} className="rounded px-4 font-bold py-1 duration-750">
                    {item.year}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="px-4"
        >
          {items[activeIndex].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
