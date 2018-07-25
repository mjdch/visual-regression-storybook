/**
 * Check for a size keyword within a provider's image path
 * @param  {String} imagePath Path of the image to check
 * @param  {String} size      Size keyword to check
 * @return {Boolean}          Does the size match?
 */
export default function providerImageSize(imagePath, size) {
  if (typeof size === "number") return false;

  return imagePath.includes(size);
}
