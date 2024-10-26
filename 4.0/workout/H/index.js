const fs = require("fs");
const path = require("path");

var strings = readFile("input.txt");

var result = getResult(...parseData(strings));

writeToFile(result, "output.txt");

function getResult(a, b, n) {
  // максимальное количество человек в первой группе
  var kmax = a;

  // минимальное количество человек во второй группе
  var smin = Math.ceil(b / n);

  if (kmax > smin) {
    return "Yes";
  }

  return "No";
}

function parseData(strings) {
  var a = +strings[0];
  var b = +strings[1];
  var n = +strings[2];

  return [a, b, n];
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
