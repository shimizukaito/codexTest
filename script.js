const sketchSet = [
  function (p) {
    const dots = [];

    p.setup = () => {
      const canvas = p.createCanvas(960, 360);
      canvas.parent("p5-container");
      p.colorMode(p.HSB, 360, 100, 100, 1);
      for (let i = 0; i < 120; i += 1) {
        dots.push({
          x: p.random(p.width),
          y: p.random(p.height),
          size: p.random(8, 22),
          hue: p.random(360),
          speed: p.random(0.2, 0.8),
        });
      }
      p.noStroke();
    };

    p.draw = () => {
      p.background(225, 45, 8, 0.2);
      dots.forEach((dot) => {
        dot.x += dot.speed;
        if (dot.x > p.width + dot.size) dot.x = -dot.size;
        p.fill(dot.hue, 75, 95, 0.85);
        p.circle(dot.x, dot.y + p.sin((p.frameCount + dot.hue) * 0.03) * 18, dot.size);
      });
    };
  },
  function (p) {
    p.setup = () => {
      const canvas = p.createCanvas(960, 360);
      canvas.parent("p5-container");
      p.strokeWeight(2);
      p.noFill();
    };

    p.draw = () => {
      p.background(245);
      p.translate(p.width / 2, p.height / 2);
      for (let i = 0; i < 36; i += 1) {
        p.push();
        p.rotate((p.frameCount * 0.008 + i) * p.PI / 6);
        p.stroke(40 + i * 5, 80, 160 + i * 2, 150);
        p.rect(-i * 6, -i * 6, i * 12, i * 12, 6);
        p.pop();
      }
    };
  },
  function (p) {
    const wavePoints = [];

    p.setup = () => {
      const canvas = p.createCanvas(960, 360);
      canvas.parent("p5-container");
      for (let x = 0; x < p.width; x += 14) {
        wavePoints.push({ x, offset: p.random(1000) });
      }
      p.stroke(255);
      p.strokeWeight(2);
      p.noFill();
    };

    p.draw = () => {
      p.background(16, 24, 40);
      for (let layer = 0; layer < 4; layer += 1) {
        p.beginShape();
        wavePoints.forEach((pt) => {
          const y =
            p.height * (0.25 + layer * 0.17) +
            p.noise(pt.offset + p.frameCount * 0.01 + layer * 100) * 90 -
            45;
          p.vertex(pt.x, y);
        });
        p.endShape();
      }
    };
  },
];

window.addEventListener("load", () => {
  const selectedSketch = sketchSet[Math.floor(Math.random() * sketchSet.length)];
  new p5(selectedSketch);
});
