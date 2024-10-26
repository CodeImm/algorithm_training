const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var array = fileContent
  .toString()
  .split(" ")
  .filter((v) => /\d/.test(v))
  .map(Number);
var result = getResult(array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());

function getResult(array) {
  var set = new Set(array);

  return set.size;
}
