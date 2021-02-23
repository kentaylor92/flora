const CANVAS_SIZE = [400, 400];
const SNAKE_START = [
  [10, 16],
  [10, 17]
];
const APPLE_START = [8, 3];
const SCALE = 20;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};
const DISCOUNT_CODES = {
  Five: "FivePercent",
  Ten: "TenPercent",
  Fifteen: "FifteenPercent",
  Twenty: "TwentyPercent",
  TwentyFive: "TwentyFivePercent"
}

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  DISCOUNT_CODES
};