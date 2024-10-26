const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(N, array) {
  var diffs = [];

  for (let i = 1; i < array.length; i++) {
    diffs.push(array[i] - array[i - 1]);
  }

  var ans = [];

  var r = [];
  var l = [];

  for (let i = 0; i < array.length; i++) {
    var sumr = 0;
    var suml = 0;

    for (let j = i; j < diffs.length; j++) {
      sumr = sumr + diffs[j] * (array.length - j - 1);
      suml = suml + diffs[diffs.length - j - 1] * (array.length - j - 1);
    }

    l.push(suml);
    r.push(sumr);
  }

  for (let i = 0; i < array.length; i++) {
    ans.push(r[i] + l[array.length - i - 1]);
  }

  return ans.join(" ");
}

function parseData(strings) {
  var N = +strings[0];
  var array = strings[1]
    .split(" ")
    .filter((v) => v !== "")
    .map(Number);

  return [N, array];
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
