export function renderURL(link: string | null | undefined) {
  if (!link) { return ""; }
  if (link.startsWith("http://") || link.startsWith("https://")) { return link; }
  return `https://${link}`;
}