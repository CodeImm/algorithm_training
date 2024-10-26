const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent.toString().split("\n");
var amounts = strings[0]
  .split(" ")
  .filter((v) => /\d/.test(v))
  .map(Number);

var array1 = getArray(strings, 1, amounts[0] + 1);
var array2 = getArray(strings, amounts[0] + 1, amounts[0] + amounts[1] + 1);

function getArray(lines, startLineNumber, endLineNumber) {
  var array = [];

  for (let i = startLineNumber; i < endLineNumber; i++) {
    array.push(lines[i]);
  }

  return array.map(Number);
}

var result = getResult(array1, array2);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(array1, array2) {
  var set1 = new Set(array1);

  var intersection = array2.filter((v) => set1.has(v)).sort((a, b) => a - b);

  var set3 = new Set(intersection);

  var others1 = array1.filter((v) => !set3.has(v)).sort((a, b) => a - b);
  var others2 = array2.filter((v) => !set3.has(v)).sort((a, b) => a - b);

  return [
    intersection.length,
    intersection.join(" "),
    others1.length,
    others1.join(" "),
    others2.length,
    others2.join(" "),
  ].join("\n");
}
