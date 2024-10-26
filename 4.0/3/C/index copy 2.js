const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, K, A, B, vertexList) {
  console.log(N, K, A, B, vertexList);
  var visited = new Array(N + 1).fill(false);
  var dist = new Array(N + 1).fill(Infinity);
  var prev = new Array(N + 1).fill(-1);

  dist[A] = 0;

  while (!visited[B]) {
    let min = Infinity;
    let nowVertex = null;
    for (let j = 1; j <= N; j++) {
      if (dist[j] !== Infinity && !visited[j] && dist[j] <= min) {
        min = dist[j];
        nowVertex = j;
      }
    }
    visited[nowVertex] = true;

    if (!nowVertex) {
      return "-1";
    }

    for (let i = 1; i <= N; i++) {
      if (
        nowVertex !== i &&
        vertexList[nowVertex][i] !== -1 &&
        dist[nowVertex] + vertexList[nowVertex][i] <= dist[i]
      ) {
        dist[i] = dist[nowVertex] + vertexList[nowVertex][i];
        prev[i] = nowVertex;
      }
    }
  }

  return dist[B] === Infinity ? -1 : dist[B];
}

function parseData(strings) {
  var [N, K] = strings[0].split(" ").map(Number);
  var vertexList = strings
    .splice(1, K)
    .map((str) => str.split(" ").map(Number));

  var map = new Map();

  vertexList.forEach((way) => {
    map.get(way[0])
      ? map.get(way[0]).push([way[1], way[2]])
      : map.set(way[0], [[way[1], way[2]]]);
  });

  var [A, B] = strings[1].split(" ").map(Number);
  return [N, K, A, B, map];
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
