import { adjustBrightness, createColoursArray as createRenderColours } from "./colourHelpers";
import { getRndInteger } from "./mathHelpers";

export default function sketch(p) {
    let canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight : p.windowWidth;
    let offset = 0;
    let freq = 0.05;
    let speed = 0.00075;
    let strum = 1;
    let mainColours = ["#7dbeff", "#ff8c00", "#ff0000"];
    let renderColours = [];
    let randomSizes = [];
    let randomColourOffsets = [];

    function init() {
      for (let i = 0; i < canvasSize; i++) {
        randomSizes.push(getRndInteger(40, 250));
        randomColourOffsets.push(getRndInteger(-75, 75));
      }
      renderColours = createRenderColours(mainColours, canvasSize);
    }

    p.setup = () => {
      p.createCanvas(canvasSize, canvasSize, p.P2D);
      p.strokeWeight(0.1);
      init();
    }
  
    p.windowResized = () => {
      p.noLoop();
      canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight : p.windowWidth;
      init();
      p.resizeCanvas(canvasSize, canvasSize);
      p.loop();
    }
  
    p.draw = () => {
        p.background(0);
        for(let y = 0; y < canvasSize; y++){
            const angle = offset + y * freq;
            const x = p.map(p.sin(angle), -strum, strum, 50, canvasSize-50);
            p.fill(adjustBrightness(renderColours[y], randomColourOffsets[y]));
            p.circle(x, y, randomSizes[y]);
        }
        offset += speed;
    }
  }
  
  