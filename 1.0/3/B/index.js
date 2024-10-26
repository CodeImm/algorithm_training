const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var strings = fileContent.toString().split("\n");
var array1 = strings[0]
  .split(" ")
  .filter((v) => /\d/.test(v))
  .map(Number);
var array2 = strings[1]
  .split(" ")
  .filter((v) => /\d/.test(v))
  .map(Number);

var result = getResult(array1, array2);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(array1, array2) {
  var set1 = new Set(array1);

  var ans = array2.filter((v) => set1.has(v));

  return ans.sort((a, b) => a - b).join(" ");
}
