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

  var prefixsum = [0];

  for (let i = 0; i < diffs.length; i++) {
    prefixsum.push(prefixsum[i] + diffs[i]);
  }

  var ans = [0];

  for (let i = 0; i < prefixsum.length; i++) {
    ans[0] += prefixsum[i];
  }

  for (let i = 1; i < array.length; i++) {
    let sum =
      ans[i - 1] +
      (prefixsum[i] - prefixsum[i - 1]) * (i - 1) -
      (prefixsum[i] - prefixsum[i - 1]) * (prefixsum.length - i - 1);

    ans.push(sum);
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
