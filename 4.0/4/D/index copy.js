var fs = require("fs");
var path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, vertexMatrix) {
  if (N === 1) {
    return 0;
  }

  var used = new Array(N + 1).fill(false);

  var result = Infinity;

  var lengths = [];

  used[1] = true;
  gen(N, used);
  console.log(Math.min(...lengths));
  // return lengths.join("\n");
  return result === Infinity ? -1 : result;

  function gen(n, used, length = 0, prefix = [1]) {
    if (
      prefix.length === n &&
      vertexMatrix[prefix[prefix.length - 1]][1] !== 0
    ) {
      let currentWay = length + vertexMatrix[prefix[prefix.length - 1]][1];
      lengths.push(currentWay);
      if (currentWay < result) {
        result = currentWay;
      }

      return;
    }

    for (let i = 2; i <= n; i++) {
      if (!used[i]) {
        if (vertexMatrix[prefix[prefix.length - 1]][i] === 0) {
          return;
        }

        length += vertexMatrix[prefix[prefix.length - 1]][i];

        used[i] = true;
        prefix.push(i);

        gen(n, used, length, prefix);

        used[i] = false;
        prefix.pop();
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
