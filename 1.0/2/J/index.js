var fs = require("fs");
var path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [N, ...records] = fileContent.toString().split("\n");

records = records.map((string) => string.split(" "));

var result = getResult(N, ...records);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(N, ...records) {
  var range1 = 30;
  var range2 = 4000;

  for (let i = 1; i < N; i++) {
    let min = Math.min(records[i][0], records[i - 1][0]);

    let mid = min + Math.abs(records[i][0] - records[i - 1][0]) / 2;

    if (Math.abs(records[i][0] - records[i - 1][0]) < 10 ** -6) {
      continue;
    }

    if (+records[i][0] < +records[i - 1][0]) {
      if (records[i][1] === "closer") {
        range2 = mid < range2 ? mid : range2;
      } else {
        range1 = mid > range1 ? mid : range1;
      }
    } else {
      if (records[i][1] === "closer") {
        range1 = mid > range1 ? mid : range1;
      } else {
        range2 = mid < range2 ? mid : range2;
      }
    }
  }

  return [range1, range2].join(" ");
}
