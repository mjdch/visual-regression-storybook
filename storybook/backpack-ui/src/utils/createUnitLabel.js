function isUnitPlural(unit) {
  return unit.substring(unit.length - 1) === "s";
}

function makeUnitSingular(unit) {
  return isUnitPlural(unit) && unit.substring(0, unit.length - 1);
}

function makeUnitPlural(unit) {
  return `${unit}s`;
}

export default function createUnitLabel(value, unit) {
  let formattedUnitLabel = "";

  if (isUnitPlural(unit) && parseFloat(value) === 1) {
    formattedUnitLabel = makeUnitSingular(unit);
  }

  if (!isUnitPlural(unit) && parseFloat(value) !== 1) {
    formattedUnitLabel = makeUnitPlural(unit);
  }

  return formattedUnitLabel || unit;
}
