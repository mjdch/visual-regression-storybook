import haversine from "haversine";

export function distanceTo(startingCoordinates, endingCoordinates) {
  const start = {
    latitude: startingCoordinates[0],
    longitude: startingCoordinates[1],
  };

  const end = {
    latitude: endingCoordinates[0],
    longitude: endingCoordinates[1],
  };

  const metricDistance = haversine(start, end, { unit: "km" });
  const imperialDistance = haversine(start, end, { unit: "mile" });

  return {
    metric: {
      amount: metricDistance.toFixed(2),
      unit: "km",
    },
    imperial: {
      amount: imperialDistance.toFixed(2),
      unit: "miles",
    },
  };
}

function readCookie(name) {
  let c = [];
  if (typeof document !== "undefined" && document.cookie) {
    c = document.cookie.split("; ");
  }
  const cookies = {};

  c.forEach((cookie) => {
    const cookieValue = cookie.split("=");
    cookies[cookieValue[0]] = cookieValue[1];
  });

  return cookies[name];
}

export function distanceUnits() {
  if (readCookie("lpCurrency") === "USD") {
    return "imperial";
  }

  return "metric";
}
