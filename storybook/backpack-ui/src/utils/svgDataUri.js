export default function svgDataUri(image) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(image)}`;
}
