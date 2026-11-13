import { toPng } from "html-to-image";

export async function capturePng(node: HTMLElement) {
  return toPng(node, { cacheBust: true, pixelRatio: 2 });
}

export async function copyPng(dataUrl: string) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}
