/**
 * Define keyframes for CSS animation via Radium
 * https://github.com/formidablelabs/radium/tree/master/docs/api#keyframes
 */

import radium from "radium";

export const pulseOpacity = radium.keyframes({
  "0%": {
    opacity: 0.55,
  },
  "50%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0.55,
  },
});

export const bookingLoaderFade = radium.keyframes({
  "0%": {
    opacity: 0.3,
  },
  "100%": {
    opacity: 1,
  },
});

export const flyIn = radium.keyframes({
  "0%": {
    opacity: 0,
    transform: "translate(-25rem)",
    width: "150%",
  },
  "100%": {
    opacity: 1,
    transform: "translate(0)",
    width: "150%",
  },
});

export const heartbeat = radium.keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "5%": {
    transform: "scale(1.3)",
  },
  "10%": {
    transform: "scale(1)",
  },
  "15%": {
    transform: "scale(1.3)",
  },
  "20%": {
    transform: "scale(1)",
  },
});

export const spin = radium.keyframes({
  "0%": {
    transform: "rotate(0)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export default function keyframes() {
  return {
    bookingLoaderFade,
    flyIn,
    heartbeat,
    spin,
  };
}
