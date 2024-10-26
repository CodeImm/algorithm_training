const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [a, b, c] = fileContent.toString().split("\n").map(Number);

function getResult(a, b, c) {
  if (a === 0 && c >= 0 && c ** 2 === b) {
    return "MANY SOLUTIONS";
  }

  if (c < 0) {
    return "NO SOLUTION";
  }

  var x = (c ** 2 - b) / a;

  return Number.isInteger(x) ? x : "NO SOLUTION";
}

var result = getResult(a, b, c);

const outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
