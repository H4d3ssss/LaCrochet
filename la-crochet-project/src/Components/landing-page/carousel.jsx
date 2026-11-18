import { useState, useEffect } from "react";

export default function Carousel({ slides, autoPlayMs = 4000, height = "h-128" }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlayMs) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [slides.length, autoPlayMs]);

  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0 relative">
            <div className={`${height} w-full overflow-hidden`}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
      >
        ›
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              i === current ? "bg-amber-800" : "bg-stone-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}