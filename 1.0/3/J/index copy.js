const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [meta, ...array] = fileContent.toString().split("\n");

const [t, d, n] = meta.split(" ");

array = array.map((str) => str.split(" ").map(Number));

var result = getResult(t, d, n, array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(t, d, n, array) {
  var intersection = [[0, 0].join(",")];

  for (let i = 0; i < n; i++) {
    intersection = getI(intersection, array[i], t, d);
  }

  return printCoords(intersection);

  function getI(intersection, coordinates, stepDistance, navDistance) {
    var navCoords = getPossibleCoordsForDistanceArray(
      coordinates[0],
      coordinates[1],
      navDistance
    );

    var stepCoords = new Set();
    intersection.forEach((coords) => [
      getPossibleCoordsForDistanceArray(
        ...coords.split(","),
        stepDistance
      ).forEach((el) => stepCoords.add(el)),
    ]);

    return getIntersection(stepCoords, navCoords);
  }

  function getPossibleCoordsForDistanceArray(x, y, distance) {
    var coords = [];

    for (let i = -distance; i <= +distance; i++) {
      for (let j = -distance; j <= +distance; j++) {
        if (Math.abs(i) + Math.abs(j) <= distance) {
          let val = `${+x + i},${+y + j}`;
          coords.push(val);
        }
      }
    }

    return coords;
  }

  function getIntersection(set, array1) {
    return array1.filter((coords) => set.has(coords));
  }

  function printCoords(coords) {
    return [
      coords.length,
      coords.map((el) => el.replace(",", " ")).join("\n"),
    ].join("\n");
  }
}
