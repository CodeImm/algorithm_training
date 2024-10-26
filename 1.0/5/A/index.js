const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var [N, shirts, M, trousers] = parseData(strings);

var result = getResult(N, shirts, M, trousers);

writeToFile(result, "output.txt");

function getResult(N, shirts, M, trousers) {
  var ans = [shirts[0], trousers[0]];
  var diff = Math.abs(shirts[0] - trousers[0]);

  var i = 0,
    j = 0;

  while (i < N && j < M) {
    let diffnow = Math.abs(shirts[i] - trousers[j]);

    if (diffnow === 0) {
      return [shirts[i], trousers[j]].join(" ");
    }

    if (diffnow < diff) {
      ans = [shirts[i], trousers[j]];
      diff = diffnow;
    }

    if (shirts[i] < trousers[j]) {
      i++;
    } else if (shirts[i] > trousers[j]) {
      j++;
    }
  }

  return ans.join(" ");
}

function parseData(strings) {
  strings = strings.filter((str) => str !== "");

  var N = +strings[0];
  var shirts = strings[1].split(" ").map(Number);
  var M = +strings[2];
  var trousers = strings[3].split(" ").map(Number);

  return [N, shirts, M, trousers];
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
