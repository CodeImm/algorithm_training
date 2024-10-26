"use strict";

var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, vertexMatrix) {
  var vertexes = Array.from({ length: N }, (_, i) => i + 1);

  var maxCutSize = 0;

  var finalGroupA = new Set();
  var finalGroupB = new Set();

  for (let i = 1; i <= N - 1; i++) {
    combine(vertexes.slice(1), i);
  }

  var finalGroupResult = [];

  for (let i = 1; i <= N; i++) {
    if (finalGroupA.has(i)) {
      finalGroupResult.push(1);
    }

    if (finalGroupB.has(i)) {
      finalGroupResult.push(2);
    }
  }

  return [maxCutSize, finalGroupResult.join(" ")].join("\n");

  function combine(arr, k) {
    var tempGroupA = Array(k);

    internalCombine(0, 0);

    function internalCombine(start, depth) {
      if (depth === k) {
        var tempGroupB = vertexes.filter((x) => !tempGroupA.includes(x));
        let length = 0;
        tempGroupB.forEach((i) => {
          tempGroupA.forEach((j) => {
            length += vertexMatrix[i][j];
          });
        });

        if (length > maxCutSize) {
          maxCutSize = length;
          finalGroupA = new Set(tempGroupA);
          finalGroupB = new Set(tempGroupB);
        }
        return;
      }

      for (let index = start; index < arr.length; index++) {
        tempGroupA[depth] = arr[index];

        internalCombine(index + 1, depth + 1);
      }
    }
  }
}

function parseData(strings) {
  var N = +strings[0];

  var vertexMatrix = strings
    .splice(1, N)
    .map((str) => [0, ...str.split(" ").map(Number)]);
  vertexMatrix.unshift(new Array(N + 1).fill(0));

  return [N, vertexMatrix];
}

function readFile(fileName) {
  var inputPath = path.resolve(__dirname, fileName);
  var fileContent = fs.readFileSync(inputPath, "utf8");

  return fileContent.toString().split("\n");
}

function writeToFile(data, fileName) {
  var outputPath = path.resolve(__dirname, fileName);
  fs.writeFileSync(outputPath, data.toString());
}
