function interpolateColours(colour1, colour2, percent) {
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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function clampNumber(num, a, b) {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

function adjustBrightness(colour, brightnessOffset){
  const r = clampNumber(parseInt(colour.substring(1, 3), 16) + brightnessOffset, 0, 255);
  const g = clampNumber(parseInt(colour.substring(3, 5), 16) + brightnessOffset, 0, 255);
  const b = clampNumber(parseInt(colour.substring(5, 7), 16) + brightnessOffset, 0, 255);

  const outColour = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return outColour;
}

export default function sketch(p) {
    let canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight : p.windowWidth;
    let offset = 0;
    let freq = 0.035;
    let speed = 0.0005;
    let strum = 1;
    let colour1 = "#ff8100";
    let colour2 = "#7dbeff";
    let randomSizes = [];
    let randomColourOffsets = [];

    p.setup = () => {
      p.createCanvas(canvasSize, canvasSize, p.P2D);
      p.noStroke();
      for(let i = 0; i < canvasSize; i++){
        randomSizes.push(getRndInteger(40, 250));
        randomColourOffsets.push(getRndInteger(-40, 40));
      }
    }
  
    p.windowResized = () => {}
  
    p.draw = () => {
        p.background(0);
        for(let y = 0; y < canvasSize; y++){
            const angle = offset + y * freq;
            const x = p.map(p.sin(angle), -strum, strum, 50, canvasSize-50);
            p.fill(adjustBrightness(interpolateColours(colour1, colour2, p.map(y, 0, canvasSize, 0, 1)), randomColourOffsets[y]));
            p.circle(x, y, randomSizes[y]);
        }
        offset += speed;
    }
  }
  
  