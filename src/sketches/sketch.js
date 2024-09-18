import { adjustBrightness, createRenderColours, interpolateColours} from "./colourHelpers";
import { getRndInteger } from "./mathHelpers";

export default function sketch(p) {
  let offset = 0;
  let freq = 0.05;
  let speed = 0.00075;
  let strum = 1;
  let animationStep = 0;
  let animationState1 = 0;
  let animationState2 = 0;

  let firstColours = ["#7dbeff", "#ff8c00", "#007f00"];
  let secondColours = ["#ffffff", "#ff8c00", "#ff0000"];
  let circleStartSizeVariation = 100;
  let circleSizeVariation = 100;
  let sizeRandVariation = 50;
  let colourVariation = 50;
  let saturationVariation = 100;

  let circleStartSize = p.map(circleStartSizeVariation, 0, 100, 10, 125);
  let circleSizeRange = [
    circleStartSize,
    p.map(circleSizeVariation, 0, 100, circleStartSize, circleStartSize + 125)
  ];
  let sizeRand = p.map(sizeRandVariation, 0, 100, 0, 30);
  let colourOffsetRange = p.map(colourVariation, 0, 100, 0, 75);
  let saturationOffset = p.map(saturationVariation, 0, 100, 255, 0);

  let renderColours1 = [];
  let renderColours2 = [];
  let circleSizes = [];
  let colourOffsets = [];

  function init() {
    for (let i = 0; i < p.windowHeight; i++) {
      const angle = offset + i * .3;
      const circleSize = p.map(p.sin(angle), -1, 1, circleSizeRange[0], circleSizeRange[1]);
      const circleSizeRandomisation = getRndInteger(-sizeRand, sizeRand);
      circleSizes.push(circleSize + circleSizeRandomisation);
      colourOffsets.push(getRndInteger(-colourOffsetRange, colourOffsetRange));
    }
    renderColours1 = createRenderColours(firstColours, p.windowHeight);
    renderColours2 = createRenderColours(secondColours, p.windowHeight);
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
    // p.strokeWeight(0.1);
    p.noStroke();
    p.textSize(100)
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
    for (let y = 0; y < p.windowHeight; y++) {
      const interpolatedColour = interpolateColours(renderColours1[y], renderColours2[y], p.map(animationState2, 0, 100, 0, 1));
      let colour = adjustBrightness(interpolatedColour, colourOffsets[y]); // Adjust for colour variation
      const saturationAnimationOffset = Math.round(p.map(animationState1, 0, 100, 50, saturationOffset));
      colour = adjustBrightness(colour, saturationOffset); // Adjust for saturation variation
      p.fill(colour);

      const angle = offset + y * freq;
      const x = p.map(p.sin(angle), -strum, strum, 50, p.windowWidth - 50);
      const offsetY = p.map(y, 0, p.windowHeight, -50, p.windowHeight + 50);
      const circleSize = p.map(animationState1, 0, 100, 200, circleSizes[y]);
      p.circle(x, offsetY, circleSize);
    }
    offset += speed;

    let angle = animationStep * 0.01;
    animationState1 = p.map(p.cos(angle), -1, 1, 0, 100);
    animationState1 = Math.round(animationState1 * 100) / 100;
    angle = animationStep * 0.005;
    animationState2 = p.map(p.cos(angle), -1, 1, 0, 100);
    animationStep++;
  }
}
