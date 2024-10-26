var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, vertexMatrix) {
  var visited = new Array(N + 1).fill(false);

  var maxCutSize = 0;

  var finalGroupA = new Set();
  var finalGroupB = new Set();

  var tempGroupA = new Set();
  var tempGroupB = new Set();

  tempGroupA.add(1);
  visited[1] = true;

  gen(N, visited, tempGroupA, tempGroupB, 0, 1);

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

  function gen(n, visited, tempGroupA, tempGroupB, currentLength = 0) {
    if (
      tempGroupA.size + tempGroupB.size === n &&
      tempGroupA.size !== 0 &&
      tempGroupB.size !== 0 &&
      dfs(tempGroupA.values().next().value, tempGroupA) === tempGroupA.size &&
      dfs(tempGroupB.values().next().value, tempGroupB) === tempGroupB.size
    ) {
      if (currentLength > maxCutSize) {
        maxCutSize = currentLength;
        finalGroupA = new Set(tempGroupA);
        finalGroupB = new Set(tempGroupB);
      }

      return;
    }

    for (let vertexIndex = 1; vertexIndex <= n; vertexIndex++) {
      if (!visited[vertexIndex]) {
        {
          visited[vertexIndex] = true;
          tempGroupB.add(vertexIndex);

          let addedLength = 0;
          tempGroupA.forEach((element) => {
            addedLength += vertexMatrix[element][vertexIndex];
          });

          currentLength += addedLength;
          gen(n, visited, tempGroupA, tempGroupB, currentLength);
          currentLength -= addedLength;

          visited[vertexIndex] = false;
          tempGroupB.delete(vertexIndex);
        }

        {
          visited[vertexIndex] = true;
          tempGroupA.add(vertexIndex);

          let addedLength = 0;
          tempGroupB.forEach((element) => {
            addedLength += vertexMatrix[element][vertexIndex];
          });

          currentLength += addedLength;
          gen(n, visited, tempGroupA, tempGroupB, currentLength);
          currentLength -= addedLength;

          visited[vertexIndex] = false;
          tempGroupA.delete(vertexIndex);
        }
      }
    }
  }

  function dfs(
    startVertex,
    group,
    visited = new Array(group.size + 1).fill(false)
  ) {
    let visitedVerticesCount = 1;
    visited[startVertex] = true;

    group.forEach((i) => {
      if (!visited[i] && vertexMatrix[startVertex][i] !== 0) {
        visitedVerticesCount += dfs(i, group, visited);
      }
    });

    return visitedVerticesCount;
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
