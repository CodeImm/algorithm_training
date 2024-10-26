const fs = require("fs");
const path = require("path");

var inputPath = path.resolve(__dirname, "input.txt");
var fileContent = fs.readFileSync(inputPath, "utf8");

var array = fileContent.toString().split(" ").map(Number);

function getResult(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] <= array[i - 1]) {
      return "NO";
    }
  }

  return "YES";
}

var result = getResult(array);

var outputPath = path.resolve(__dirname, "output.txt");
fs.writeFileSync(outputPath, result.toString());
