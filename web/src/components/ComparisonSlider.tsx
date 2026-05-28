'use client'
import { useState, useRef, useCallback } from 'react';

export default function ComparisonSlider({ before, after, beforeLabel = 'Before', afterLabel = 'After' }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  const onMouseMove = useCallback((e) => { if (dragging) updatePosition(e.clientX); }, [dragging, updatePosition]);
  const onMouseUp = () => setDragging(false);

  const onTouchStart = () => setDragging(true);
  const onTouchMove = useCallback((e) => { if (dragging) updatePosition(e.touches[0].clientX); }, [dragging, updatePosition]);
  const onTouchEnd = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none cursor-col-resize"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* After (full width, base layer) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped to left of slider) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: containerRef.current?.offsetWidth || 600 }} />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ left: `${position}%` }}>
        {/* Handle */}
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-slate-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-cyan-400/90 backdrop-blur-sm text-slate-950 text-xs font-medium px-3 py-1 rounded-full">
        {afterLabel}
      </div>
    </div>
  );
}