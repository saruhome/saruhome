import { useState, useRef, useEffect, ReactNode } from "react";
import { useIsMobile } from "@/hooks/useMobile";

/**
 * Design System — Project-first pixel console navigation.
 * Keep movement tactile, but make position, destination, and keyboard focus explicit for portfolio review.
 */
interface HorizontalSliderProps {
  children: ReactNode[];
  onSlideChange?: (index: number) => void;
  showDots?: boolean;
  showArrows?: boolean;
  accentColor?: "cyan" | "orange";
  slideLabels?: string[];
  ariaLabel?: string;
}

const ACCENT_CLASSES = {
  cyan: {
    arrow: "border-cyan-300/50 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-300/20",
    dotActive: "bg-cyan-300",
    dotInactive: "bg-cyan-300/40 hover:bg-cyan-300/70",
  },
  orange: {
    arrow: "border-orange-300/50 text-orange-100 hover:border-orange-200 hover:bg-orange-300/20",
    dotActive: "bg-orange-300",
    dotInactive: "bg-orange-300/40 hover:bg-orange-300/70",
  },
} as const;

export default function HorizontalSlider({
  children,
  onSlideChange,
  showDots = true,
  showArrows = true,
  accentColor = "cyan",
  slideLabels,
  ariaLabel = "Case study sections",
}: HorizontalSliderProps) {
  const accent = ACCENT_CLASSES[accentColor];
  const stageBackground = accentColor === "orange" ? "bg-[#1a0503]" : "bg-[#07111f]";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const wheelLocked = useRef(false);

  const totalSlides = children.length;
  const isMobile = useIsMobile();
  const activeSlideLabel = slideLabels?.[currentSlide] ?? `Slide ${currentSlide + 1}`;

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

  // Trackpad (Magic Trackpad/Mouse) horizontal swipe navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 20) return;
    if (wheelLocked.current) return;
    wheelLocked.current = true;
    if (e.deltaX > 0) nextSlide();
    else prevSlide();
    setTimeout(() => {
      wheelLocked.current = false;
    }, 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (e.defaultPrevented || target?.closest("input, textarea, select, [contenteditable='true'], [role='textbox'], [data-disable-slider-keys]")) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides]);

  const translateX = -currentSlide * 100 + (isDragging ? (dragOffset / (containerRef.current?.clientWidth || 1)) * 100 : 0);

  // Below md, the fullscreen slide-paging UI doesn't fit content that varies
  // in height per slide, so stack slides vertically and let the page scroll.
  if (isMobile) {
    return (
      <div className={`flex w-full flex-col ${stageBackground}`} role="region" aria-label={ariaLabel}>
        {children.map((child, index) => (
          <section key={index} className="w-full" aria-label={slideLabels?.[index] ?? `Section ${index + 1}`}>
            {child}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${stageBackground}`} role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
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
        onWheel={handleWheel}
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
          className={`absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 border-2 bg-black/70 transition-all duration-300 md:left-8 md:grid md:place-items-center ${accent.arrow}`}
          aria-label={`Previous section. Current: ${activeSlideLabel}`}
        >
          <span className="text-lg">←</span>
        </button>
      )}

      {/* Right Arrow - Desktop Only */}
      {showArrows && currentSlide < totalSlides - 1 && (
        <button
          onClick={nextSlide}
          className={`absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 border-2 bg-black/70 transition-all duration-300 md:right-8 md:grid md:place-items-center ${accent.arrow}`}
          aria-label={`Next section. Current: ${activeSlideLabel}`}
        >
          <span className="text-lg">→</span>
        </button>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="case-study-progress absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 border border-white/25 bg-[#05080de8] px-3 py-2 md:bottom-8">
          <p className="font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/80" aria-live="polite">
            <span className={accentColor === "cyan" ? "text-cyan-200" : "text-orange-200"}>{String(currentSlide + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-white/35">/</span>{String(totalSlides).padStart(2, "0")}
            <span className="ml-2 hidden text-white/55 xl:inline">{activeSlideLabel}</span>
          </p>
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 min-w-3 transition-all duration-300 ${
                index === currentSlide
                  ? `w-8 md:w-10 ${accent.dotActive}`
                  : `w-2 md:w-3 ${accent.dotInactive}`
              }`}
              aria-label={`Go to section ${index + 1}: ${slideLabels?.[index] ?? `Slide ${index + 1}`}`}
              aria-current={index === currentSlide ? "step" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
