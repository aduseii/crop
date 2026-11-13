import { useState } from "react";
import { Link2, Upload, FileArchive } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStudioStore } from "@/lib/studio-store";
import { loadTweetFromUrl } from "@/lib/tweet/load-tweet";

export function SourcePanel() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const setSource = useStudioStore((s) => s.setSource);

  async function fromUrl() {
    if (!url.trim()) return;
    setBusy(true);
    try {
      const tweet = await loadTweetFromUrl(url.trim());
      setSource({ kind: "tweet", tweet });
      toast.success("Loaded post");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load post");
    } finally {
      setBusy(false);
    }
  }

  function fromFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setSource({ kind: "image", dataUrl: String(reader.result) });
      toast.success("Image loaded");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto border-r p-4">
      <div>
        <Label>X post URL</Label>
        <div className="mt-1 flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://x.com/.../status/..."
            onKeyDown={(e) => e.key === "Enter" && fromUrl()}
          />
          <Button size="icon" disabled={busy} onClick={fromUrl}>
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <Label>Or upload a screenshot</Label>
        <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed p-6 text-sm text-muted-foreground hover:bg-muted/50">
          <Upload className="h-4 w-4" />
          Choose image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) fromFile(f);
            }}
          />
        </label>
      </div>

      <p className="text-xs text-muted-foreground">
        Bulk zip upload is supported in the full source. Preferences stay in localStorage.
      </p>
    </div>
  );
}
