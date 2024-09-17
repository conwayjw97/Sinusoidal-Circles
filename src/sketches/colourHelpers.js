import { clampNumber } from "./mathHelpers";

export function interpolateColours(colour1, colour2, percent) {
  // Convert the hex colors to RGB values
  const r1 = parseInt(colour1.substring(1, 3), 16);
  const g1 = parseInt(colour1.substring(3, 5), 16);
  const b1 = parseInt(colour1.substring(5, 7), 16);
  const r2 = parseInt(colour2.substring(1, 3), 16);
  const g2 = parseInt(colour2.substring(3, 5), 16);
  const b2 = parseInt(colour2.substring(5, 7), 16);

  // Interpolate the RGB values
  const r = Math.round(r1 + (r2 - r1) * percent);
  const g = Math.round(g1 + (g2 - g1) * percent);
  const b = Math.round(b1 + (b2 - b1) * percent);

  // Convert the interpolated RGB values back to a hex color
  const outColour = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return outColour;
}

export function adjustBrightness(colour, brightnessOffset) {
  const r = clampNumber(parseInt(colour.substring(1, 3), 16) + brightnessOffset, 0, 255);
  const g = clampNumber(parseInt(colour.substring(3, 5), 16) + brightnessOffset, 0, 255);
  const b = clampNumber(parseInt(colour.substring(5, 7), 16) + brightnessOffset, 0, 255);

  const outColour = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return outColour;
}
export function createColoursArray(coloursList, canvasSize) {
  if (coloursList.length > 1) {
    let colours = [];
    const percent = 1 / (canvasSize / (coloursList.length - 1));
    for (let i = 0; i < coloursList.length - 1; i++) {
      let j = 0;
      while (j <= 1) {
        const colour1 = coloursList[i];
        const colour2 = coloursList[i + 1];
        colours.push(interpolateColours(colour1, colour2, j));
        j += percent;
      }
    }
    return colours;
  } else {
    return [coloursList[0]];
  }
}
