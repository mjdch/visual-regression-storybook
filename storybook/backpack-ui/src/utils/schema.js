/**
 * Exports props for schema.org specifications
 * http://schema.org/
 */

export default function schema({
  itemProp, itemType,
}) {
  return {
    itemProp,
    itemScope: "itemScope",
    itemType: `http://schema.org/${itemType}`,
  };
}
