const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var [a, b, c] = fileContent.toString().split("\n").map(Number);

function getResult(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    return "YES";
  }

  return "NO";
}

var result = getResult(a, b, c);

const outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
