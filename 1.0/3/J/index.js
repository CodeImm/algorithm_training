const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [meta, ...array] = fileContent.toString().split("\n");

const [t, d, n] = meta.split(" ").map(Number);

array = array.map((str) => str.split(" ").map(Number));

var result = getResult(t, d, n, array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(t, d, n, array) {
  var intersectionRect = [0, 0, 0, 0];

  for (let i = 0; i < n; i++) {
    intersectionRect = getI(intersectionRect, array[i], t, d);
  }

  return printCoords(getCoordsFromRect(intersectionRect));

  function getI(intersection, coordinates, stepDistance, navDistance) {
    var navCoordsRect = getNavRect(coordinates[0], coordinates[1], navDistance);

    var stepCoordsRect = getStepRect(intersection, stepDistance);

    return getIntersection(stepCoordsRect, navCoordsRect);
  }

  function getNavRect(x, y, distance) {
    return [
      x + y - distance,
      x + y + distance,
      x - y - distance,
      x - y + distance,
    ];
  }

  function getStepRect(rect, distance) {
    const [minXPlusY1, maxXPlusY1, minXMinusY1, maxXMinusY1] = rect;
    return [
      minXPlusY1 - distance,
      maxXPlusY1 + distance,
      minXMinusY1 - distance,
      maxXMinusY1 + distance,
    ];
  }

  function getIntersection(rect1, rect2) {
    const [minXPlusY1, maxXPlusY1, minXMinusY1, maxXMinusY1] = rect1;
    const [minXPlusY2, maxXPlusY2, minXMinusY2, maxXMinusY2] = rect2;

    return [
      Math.max(minXPlusY1, minXPlusY2),
      Math.min(maxXPlusY1, maxXPlusY2),
      Math.max(minXMinusY1, minXMinusY2),
      Math.min(maxXMinusY1, maxXMinusY2),
    ];
  }

  function getCoordsFromRect(rect) {
    var coords = [];

    const [minXPlusY1, maxXPlusY1, minXMinusY1, maxXMinusY1] = rect;
    for (let xPlusY = minXPlusY1; xPlusY <= maxXPlusY1; xPlusY++) {
      for (let xMinusY = minXMinusY1; xMinusY <= maxXMinusY1; xMinusY++) {
        if ((xPlusY + xMinusY) % 2 === 0) {
          x = (xPlusY + xMinusY) / 2;
          y = xPlusY - x;
          coords.push([x, y]);
        }
      }
    }

    return coords;
  }

  function printCoords(coords) {
    return [
      coords.length,
      coords.map(([x, y]) => [x, y].join(" ")).join("\n"),
    ].join("\n");
  }
}
