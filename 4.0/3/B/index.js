const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, S, F, vertexMatrix) {
  var visited = new Array(N + 1).fill(false);
  var dist = new Array(N + 1).fill(Infinity);
  var prev = new Array(N + 1).fill(-1);

  dist[S] = 0;

  while (!visited[F]) {
    let min = Infinity;
    let nowVertex = null;
    for (let j = 1; j <= N; j++) {
      if (dist[j] !== Infinity && !visited[j] && dist[j] <= min) {
        min = dist[j];
        nowVertex = j;
      }
    }

    if (!nowVertex) {
      return "-1";
    }

    visited[nowVertex] = true;

    for (let i = 1; i <= N; i++) {
      if (
        nowVertex !== i &&
        vertexMatrix[nowVertex][i] !== -1 &&
        dist[nowVertex] + vertexMatrix[nowVertex][i] <= dist[i]
      ) {
        dist[i] = dist[nowVertex] + vertexMatrix[nowVertex][i];
        prev[i] = nowVertex;
      }
    }
  }

  var nowV = F;
  var ans = [];
  while (nowV !== -1) {
    ans.push(nowV);
    nowV = prev[nowV];
  }

  return ans.reverse().join(" ");
}

function parseData(strings) {
  var [N, S, F] = strings[0].split(" ").map(Number);
  var vertexMatrix = strings
    .splice(1, N)
    .map((str) => [0, ...str.split(" ").map(Number)]);
  vertexMatrix.unshift(new Array(N + 1).fill(0));

  return [N, S, F, vertexMatrix];
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
