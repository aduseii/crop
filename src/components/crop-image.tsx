import { useEffect, useRef } from "react";

export function CropImage({
  src,
  panX,
  panY,
  zoom,
  panFactor = 1,
  onPan,
  onZoom,
}: {
  src: string;
  panX: number;
  panY: number;
  zoom: number;
  panFactor?: number;
  onPan: (x: number, y: number) => void;
  onZoom: (zoom: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(4, Math.max(0.5, zoom * (e.deltaY > 0 ? 0.92 : 1.08)));
      onZoom(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, onZoom]);

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden bg-black"
      onPointerDown={(e) => {
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = (e.clientX - last.current.x) * panFactor;
        const dy = (e.clientY - last.current.y) * panFactor;
        last.current = { x: e.clientX, y: e.clientY };
        onPan(panX + dx, panY + dy);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <img
        src={src}
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
        style={{
          transform: `translate(-50%, -50%) translate(${panX}px, ${panY}px) scale(${zoom})`,
        }}
        draggable={false}
      />
    </div>
  );
}
