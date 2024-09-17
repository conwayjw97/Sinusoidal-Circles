import { adjustBrightness, createColoursArray as createRenderColours } from "./colourHelpers";
import { getRndInteger } from "./mathHelpers";

export default function sketch(p) {
    let offset = 2;
    let freq = 0.05;
    let speed = 0.00075;
    let strum = 1;
    let mainColours = ["#7dbeff", "#ff8c00", "#ff0000"];
    let renderColours = [];
    let circleSizes = [];
    let colourOffsets = [];

    function init() {
      for (let i = 0; i < p.windowHeight; i++) {
        const angle = offset + i * .3;
        circleSizes.push(p.map(p.sin(angle), -1, 1, 125, 250) + getRndInteger(-30, 30));
        colourOffsets.push(getRndInteger(-75, 75));
      }
      renderColours = createRenderColours(mainColours, p.windowHeight);
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
      p.strokeWeight(0.1);
      init();
    }
  
    p.windowResized = () => {
      p.noLoop();
      init();
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      p.loop();
    }
  
    p.draw = () => {
        p.background(0);
        for(let y = 0; y < p.windowHeight; y++){
            const angle = offset + y * freq;
            const x = p.map(p.sin(angle), -strum, strum, 50, p.windowWidth-50);
            p.fill(adjustBrightness(renderColours[y], colourOffsets[y]));
            const offsetY = p.map(y, 0, p.windowHeight, -50, p.windowHeight+50)
            p.circle(x, offsetY, circleSizes[y]);
        }
        offset += speed;
    }
  }
  
  