var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, vertexMatrix) {
  var visited = new Array(N + 1).fill(false);
  var vertexes = Array.from({ length: N }, (_, i) => i + 1);

  var maxCutSize = 0;

  var finalGroupA = new Set();
  var finalGroupB = new Set();

  var tempGroupA = [];
  var groups = [];

  tempGroupA.push(1);
  visited[1] = true;

  gen(N, visited, tempGroupA);

  groups.forEach(([tempGroupA, tempGroupB]) => {
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
  });

  var finalGroupResult = [];

  for (let i = 1; i <= N; i++) {
    if (finalGroupA.has(i)) {
      finalGroupResult.push(2);
    }

    if (finalGroupB.has(i)) {
      finalGroupResult.push(1);
    }
  }

  return [maxCutSize, finalGroupResult.join(" ")].join("\n");

  function gen(n, visited, tempGroupA) {
    var tempGroupB = tempGroupA.length
      ? vertexes.filter((x) => !tempGroupA.includes(x))
      : [];

    if (tempGroupA.length !== 0 && tempGroupB.length !== 0) {
      console.log(tempGroupA, tempGroupB);
      groups.push([tempGroupA, tempGroupB]);
    }

    for (let i = 2; i <= n; i++) {
      if (!visited[i]) {
        visited[i] = true;

        tempGroupA.push(i);

        gen(n, visited, tempGroupA);

        tempGroupA.pop();

        visited[i] = false;
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
