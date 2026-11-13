import { useState, type RefObject } from "react";
import { Check, Copy, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { capturePng, copyPng, downloadDataUrl } from "@/lib/export-png";
import { resolveFormat } from "@/lib/formats";
import { useStudioStore } from "@/lib/studio-store";

export function ExportBar({ stageRef }: { stageRef: RefObject<HTMLDivElement | null> }) {
  const [busy, setBusy] = useState<"copy" | "download" | null>(null);
  const format = useStudioStore((s) => resolveFormat(s.formatId, s.customW, s.customH));

  async function run(kind: "copy" | "download") {
    const node = stageRef.current;
    if (!node) return;
    setBusy(kind);
    try {
      const dataUrl = await capturePng(node);
      if (kind === "copy") {
        await copyPng(dataUrl);
        toast.success("Copied PNG");
      } else {
        downloadDataUrl(dataUrl, `crop-${format.w}x${format.h}.png`);
        toast.success("Downloaded PNG");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Export failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2 border-t bg-background px-3 py-2">
      <Button size="sm" variant="outline" disabled={!!busy} onClick={() => run("copy")}>
        {busy === "copy" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
        Copy
      </Button>
      <Button size="sm" disabled={!!busy} onClick={() => run("download")}>
        {busy === "download" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Download
      </Button>
      <span className="ml-auto text-xs text-muted-foreground">
        {format.w} × {format.h}
      </span>
    </div>
  );
}
