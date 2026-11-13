import { useEffect, useRef, useState, type RefObject } from "react";
import { Crop, Link2, SlidersHorizontal } from "lucide-react";
import { ExportBar } from "@/components/export-bar";
import { FramePanel, SavePreferencesButton } from "@/components/frame-panel";
import { SourcePanel } from "@/components/source-panel";
import { Stage } from "@/components/stage";
import { useStudioStore } from "@/lib/studio-store";

type Tab = "preview" | "source" | "frame";

export function Studio() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("preview");
  const hasSource = useStudioStore((s) => !!s.source);

  useEffect(() => {
    if (!hasSource) setTab("source");
  }, [hasSource]);

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2 font-semibold">
          <Crop className="h-5 w-5" />
          Crop
        </div>
        <SavePreferencesButton />
      </header>

      <div className="hidden min-h-0 flex-1 md:grid md:grid-cols-[320px_1fr_320px]">
        <SourcePanel />
        <Stage ref={stageRef} />
        <FramePanel />
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:hidden">
        <div className="grid grid-cols-3 border-b text-sm">
          {(["preview", "source", "frame"] as const).map((id) => (
            <button
              key={id}
              className={`py-2 capitalize ${
                tab === id ? "border-b-2 border-foreground font-medium" : "text-muted-foreground"
              }`}
              onClick={() => setTab(id)}
            >
              {id === "preview" ? <SlidersHorizontal className="mx-auto h-4 w-4" /> : id === "source" ? <Link2 className="mx-auto h-4 w-4" /> : <Crop className="mx-auto h-4 w-4" />}
              <span className="sr-only">{id}</span>
            </button>
          ))}
        </div>
        <div className="min-h-0 flex-1">
          {tab === "source" && <SourcePanel />}
          {tab === "preview" && <Stage ref={stageRef} />}
          {tab === "frame" && <FramePanel />}
        </div>
      </div>

      <ExportBar stageRef={stageRef} />
    </div>
  );
}
