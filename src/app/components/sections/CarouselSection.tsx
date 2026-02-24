'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RichText } from '../ui/RichText';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionTitle } from '../ui/SectionTitle';
import { TestimonialItem } from '@/app/lib/types';

interface TestimonialsSection {
  label?: string;
  title?: string;
  elementsInView?: number;
  testimonialCollection?: {
    items: TestimonialItem[];
  };
}

const CarouselSection = ({ section }: { section: TestimonialsSection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const items = section?.testimonialCollection?.items || [];

  const [elementsInView, setElementsInView] = useState(1);
  const totalSlides = Math.max(0, items.length - elementsInView + 1);

  useEffect(() => {
    const desktopCount = section.elementsInView || 3;
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setElementsInView(e.matches ? desktopCount : 1);
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [section.elementsInView]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [elementsInView]);

  useEffect(() => {
    if (!isAutoPlaying || items.length <= elementsInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length, elementsInView, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  if (items.length === 0) return null;

  return (
    <section className="section-wrapper">
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto text-center space-y-8">
        <SectionLabel label={section.label} />
        <SectionTitle title={section.title} />

        <div className="relative">
          {items.length > elementsInView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}

          <div className="py-8 overflow-y-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / elementsInView)}%)`,
              }}
            >
              {items &&
                items.map((item, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 px-3 "
                    style={{ width: `${100 / elementsInView}%` }}
                  >
                    <div className="rounded-lg p-6 h-full flex flex-col">
                      <div className="flex flex-col justify-between h-full">
                        <RichText doc={item.text} />
                        <div className="pt-4">
                          {item.person && (
                            <p className="text-sm font-semibold text-gray-900">{item.person}</p>
                          )}
                          {item.role && <p className="text-xs text-gray-600">{item.role}</p>}
                          {item.company && <p className="text-xs text-gray-600">{item.company}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {items.length > elementsInView && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-dark-blue w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
