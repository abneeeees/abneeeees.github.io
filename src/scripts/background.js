const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.1;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.querySelector('canvas'),
  context = canvas.getContext('2d');

let scale = 1,
  width,
  height;

let stars = [];

let velocity = { z: 0.0002 }; // slower depth motion

let starColor = getStarColor();

generate();
resize();
step();

window.addEventListener('resize', resize);
window.addEventListener('themechange', refreshTheme);

function getStarColor() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--canvas-stroke')
    .trim() || 'rgba(255, 255, 255, 1)';
}

function refreshTheme() {
  starColor = getStarColor();
}

function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
    });
  }
}

function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function recycleStar(star) {
  star.z = STAR_MIN_SCALE;
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function resize() {
  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach(placeStar);
}

function step() {
  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);
}

function update() {
  stars.forEach((star) => {
    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    if (
      star.x < -OVERFLOW_THRESHOLD ||
      star.x > width + OVERFLOW_THRESHOLD ||
      star.y < -OVERFLOW_THRESHOLD ||
      star.y > height + OVERFLOW_THRESHOLD
    ) {
      recycleStar(star);
    }
  });
}

function render() {
  stars.forEach((star) => {
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.15 + 0.2 * Math.random(); // lower opacity
    context.strokeStyle = starColor;

    context.beginPath();
    context.moveTo(star.x, star.y);
    context.lineTo(star.x + 0.5, star.y + 0.5);
    context.stroke();
  });
}
