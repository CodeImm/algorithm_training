var fs = require("fs");
var path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent.toString().split("\n");

var [conf, ...mins] = strings.map((string) => {
  return string
    .split(" ")
    .filter((x) => /^[\+|-]?\d+$/.test(x))
    .map(Number);
});

var result = getResult(conf, mins);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(conf, mines) {
  const [N, M, K] = conf;
  var field = [];

  for (let i = 0; i < N; i++) {
    field[i] = [];
    for (let j = 0; j < M; j++) {
      field[i][j] = 0;
    }
  }

  mines.forEach((coords) => {
    let n = coords[0] - 1;
    let m = coords[1] - 1;

    for (let i = n - 1; i <= n + 1; i++) {
      if (i < N && i >= 0) {
        for (let j = m - 1; j <= m + 1; j++) {
          if (j >= 0 && j < M && field[i][j] !== "*") {
            if (i === n && m === j) {
              field[i][j] = "*";
            } else {
              field[i][j] += 1;
            }
          }
        }
      }
    }
  });

  return field.map((str) => str.join(" ")).join("\n");
}
