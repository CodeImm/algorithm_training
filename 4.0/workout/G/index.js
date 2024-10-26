const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, M, array) {
  var ans = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (array[i][j] !== 0) {
        array[i][j] =
          Math.min(
            array[i - 1] ? array[i - 1][j - 1] ?? 0 : 0,
            array[i][j - 1] ?? 0,
            array[i - 1] ? array[i - 1][j] ?? 0 : 0
          ) + 1;

        if (array[i][j] > ans) {
          ans = array[i][j];
        }
      }
    }
  }

  return ans;
}

function parseData(strings) {
  var [N, M] = strings.splice(0, 1)[0].split(" ").map(Number);
  var array = strings.splice(0, N).map((str) =>
    str
      .split(" ")
      .filter((str) => str !== "")
      .map(Number)
  );

  return [N, M, array];
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
