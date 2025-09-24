import { building, dev } from "$app/environment";

export function optimize(src: string, widths = [640, 960, 1280], quality = 90) {
  if (dev || building) { return src };

  return widths
    .slice()
    .sort((a, b) => a - b)
    .map((width, i) => {
      const url = `/_vercel/image?url=${src}&w=${width}&q=${quality}`;
      const descriptor = i < widths.length - 1 ? ` ${width}w` : '';
      return url + descriptor;
    })
    .join(', ');
}

export function optimizeSingle(src: string, width = 640, quality = 90) {
  if (dev || building) { return src };

  return `/_vercel/image?url=${src}&w=${width}&q=${quality}`;
}
