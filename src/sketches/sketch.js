import { adjustBrightness, interpolateColours } from "./colourHelpers";
import { getRndInteger } from "./mathHelpers";

function populateColoursArray(coloursList, canvasSize) {
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

export default function sketch(p) {
    let canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight : p.windowWidth;
    let offset = 0;
    let freq = 0.035;
    let speed = 0.00075;
    let strum = 1;
    let coloursList = ["#7dbeff", "#ffff00", "#ff0000"];
    let colours = [];
    let randomSizes = [];
    let randomColourOffsets = [];

    p.setup = () => {
      p.createCanvas(canvasSize, canvasSize, p.P2D);
      p.noStroke();
      for(let i = 0; i < canvasSize; i++){
        randomSizes.push(getRndInteger(40, 250));
        randomColourOffsets.push(getRndInteger(-75, 75));
        // randomColourOffsets.push(brightnessOffset);
        // brightnessOffset = (brightnessOffset + 45) % 127;
      }
      colours = populateColoursArray(coloursList, canvasSize);
    }
  
    p.windowResized = () => {}
  
    p.draw = () => {
        p.background(0);
        for(let y = 0; y < canvasSize; y++){
            const angle = offset + y * freq;
            const x = p.map(p.sin(angle), -strum, strum, 50, canvasSize-50);
            // p.fill(adjustBrightness(interpolateColours(colour1, colour2, p.map(y, 0, canvasSize, 0, 1)), randomColourOffsets[y]));
            p.fill(adjustBrightness(colours[y], randomColourOffsets[y]));
            p.circle(x, y, randomSizes[y]);
        }
        offset += speed;
    }
  }
  
  