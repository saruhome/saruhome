import { useState, useRef, useEffect, ReactNode } from "react";

interface HorizontalSliderProps {
  children: ReactNode[];
  onSlideChange?: (index: number) => void;
  showDots?: boolean;
  showArrows?: boolean;
  snapToCenter?: boolean;
}

export default function HorizontalSlider({
  children,
  onSlideChange,
  showDots = true,
  showArrows = true,
  snapToCenter = true,
}: HorizontalSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const totalSlides = children.length;

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = 50; // 50px threshold for slide change

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentSlide > 0) {
        goToSlide(currentSlide - 1);
      } else if (dragOffset < 0 && currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      }
    }
    setDragOffset(0);
  };

  const goToSlide = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlide(newIndex);
    onSlideChange?.(newIndex);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides]);

  const translateX = -currentSlide * 100 + (isDragging ? (dragOffset / (containerRef.current?.clientWidth || 1)) * 100 : 0);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07111f]">
      {/* Slider Container */}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="h-full w-full flex-shrink-0 overflow-y-auto"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow - Desktop Only */}
      {showArrows && currentSlide > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 skew-x-[-12deg] border-2 border-cyan-300/50 bg-black/70 p-2 text-cyan-100 transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-300/20 md:left-8 md:block"
          aria-label="Previous slide"
        >
          <span className="inline-block skew-x-[12deg] text-lg">←</span>
        </button>
      )}

      {/* Right Arrow - Desktop Only */}
      {showArrows && currentSlide < totalSlides - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 skew-x-[-12deg] border-2 border-cyan-300/50 bg-black/70 p-2 text-cyan-100 transition-all duration-300 hover:border-cyan-200 hover:bg-cyan-300/20 md:right-8 md:block"
          aria-label="Next slide"
        >
          <span className="inline-block skew-x-[12deg] text-lg">→</span>
        </button>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-8">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 transition-all duration-300 md:h-3 ${
                index === currentSlide
                  ? "w-8 bg-cyan-300 md:w-10"
                  : "w-2 bg-cyan-300/40 hover:bg-cyan-300/70 md:w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
