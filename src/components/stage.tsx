import { forwardRef } from "react";
import { TweetCard } from "@/components/tweet-card";
import { CropImage } from "@/components/crop-image";
import { useStudioStore } from "@/lib/studio-store";
import { resolveFormat } from "@/lib/formats";

export const Stage = forwardRef<HTMLDivElement>(function Stage(_, ref) {
  const source = useStudioStore((s) => s.source);
  const format = useStudioStore((s) => resolveFormat(s.formatId, s.customW, s.customH));
  const backdrop = useStudioStore((s) => s.backdrop);
  const panX = useStudioStore((s) => s.panX);
  const panY = useStudioStore((s) => s.panY);
  const zoom = useStudioStore((s) => s.zoom);
  const setPan = useStudioStore((s) => s.setPan);
  const setZoom = useStudioStore((s) => s.setZoom);

  return (
    <div className="flex h-full items-center justify-center bg-muted/30 p-4">
      <div
        ref={ref}
        className="relative overflow-hidden bg-black shadow-2xl"
        style={{
          width: Math.min(format.w, 900),
          height: Math.min(format.h, 900),
          aspectRatio: `${format.w} / ${format.h}`,
          background: backdrop === "sitcom" ? "url(/backgrounds/sitcom-burst.png) center/cover" : "#0a0a0a",
        }}
      >
        {source?.kind === "tweet" && <TweetCard tweet={source.tweet} />}
        {source?.kind === "image" && (
          <CropImage
            src={source.dataUrl}
            panX={panX}
            panY={panY}
            zoom={zoom}
            onPan={setPan}
            onZoom={setZoom}
          />
        )}
        {!source && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Load a post or image
          </div>
        )}
      </div>
    </div>
  );
});
