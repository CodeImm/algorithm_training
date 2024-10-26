const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, d, v, R, tripsMap) {
  var visited = new Array(N + 1).fill(false);
  var time = new Array(N + 1).fill(Infinity);
  var prev = new Array(N + 1).fill(-1);

  time[d] = 0;

  while (!visited[v]) {
    let min = Infinity;
    let nowVertex = null;
    for (let j = 1; j <= N; j++) {
      if (time[j] !== Infinity && !visited[j] && time[j] <= min) {
        min = time[j];
        nowVertex = j;
      }
    }
    visited[nowVertex] = true;

    if (!nowVertex) {
      return "-1";
    }

    for (let i = 1; i <= N; i++) {
      var tripsToi = tripsMap.get(nowVertex)?.[i];
      if (nowVertex !== i && tripsToi) {
        tripsToi.forEach((trip) => {
          if (trip[0] >= time[nowVertex] && trip[1] <= time[i]) {
            time[i] = trip[1];
            prev[i] = nowVertex;
          }
        });
      }
    }
  }

  return time[v] === Infinity ? -1 : time[v];
}

function parseData(strings) {
  var N = +strings[0];

  var [d, v] = strings[1].split(" ").map(Number);

  var R = +strings[2];

  var tripsMap = new Map();

  var trips = strings
    .splice(3, R)
    .map((str) => str.split(" ").map(Number))
    .forEach((trip) => {
      if (!tripsMap.get(trip[0])) {
        tripsMap.set(trip[0], { [trip[2]]: [] });
      } else if (!tripsMap.get(trip[0])?.[trip[2]]) {
        tripsMap.set(trip[0], { ...tripsMap.get(trip[0]), [trip[2]]: [] });
      }
      tripsMap.get(trip[0])[trip[2]].push([trip[1], trip[3]]);
    });

  return [N, d, v, R, tripsMap];
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
