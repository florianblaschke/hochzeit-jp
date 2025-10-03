import { building, dev } from "$app/environment";

export function optimize(src: string | null | undefined, widths = [640, 960, 1280], quality = 90) {
  if (!src) {
    return ""
  }

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
